const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

const auth = async (req,res,next) => {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(StatusCodes.UNAUTHORIZED).send("Authentication invalid");
    }

    const token = authHeader.split(" ")[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {userId:payload.userID, name:payload.name};
        next();
    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).send("Invalid token");
    }

};

module.exports = auth;