const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');


const register = async (req, res) => {
    try {
        const user = await User.create({ ...req.body });
        const token = user.createJWT();
        res.status(StatusCodes.CREATED).send({ user, token });

    } catch (error) {
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

    const token = user.createJWT()
    res.status(StatusCodes.OK).send({ user: user.name, token })

}

module.exports = { register, login };