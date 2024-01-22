const User = require('../models/User');
// const 
const { StatusCodes } = require('http-status-codes');


const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).send("Please fill all the fields");
    }

    try {
        const user = await User.create({ ...req.body });
        const token = user.createJWT();
        res.status(StatusCodes.CREATED).send({ user, token });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(StatusCodes.BAD_REQUEST).send("Email already present");
        }
        res.status(StatusCodes.BAD_REQUEST).send(error);
    }


}

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).send("Please provide email/password");
    };

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(StatusCodes.UNAUTHORIZED).send("User doesnt exits");
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        return res.status(StatusCodes.UNAUTHORIZED).send("Wrong Password");
    }

    const token = user.createJWT()
    res.status(StatusCodes.OK).send({ user: user.name, token })

}

module.exports = { register, login };