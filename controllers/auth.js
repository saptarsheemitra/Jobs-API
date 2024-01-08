const register = async (req, res) => {
    res.send("User registered");
}

const login = async (req, res) => {
    res.send("User logged in");
}

module.exports = { register, login };