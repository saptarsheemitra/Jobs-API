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
    res.send("User logged in");
}

module.exports = { register, login };