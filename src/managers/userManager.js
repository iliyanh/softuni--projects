const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("../lib/jwt");


exports.register = (userData) => User.create(userData);

const SECRET = "verylongsecret";

exports.login = async (username, password) => {
    const user = await User.findOne({username});
    if(!user) {
        throw new Error("Username or Password doesn't match!")
    }
    const isValid = await bcrypt.compare(password, user.password);
    if(!isValid) {
        throw new Error("Username or Password doesn't match!")
    }

    const payload = {
        _id: user._id,
        username: user.username
    }
    const token = await jwt.sign(payload, SECRET, {expiresIn: "2d"})
    return token
}