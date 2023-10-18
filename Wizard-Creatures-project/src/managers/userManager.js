const User = require('../models/User');
const bcrypt = require("bcrypt");
const jwt = require("../lib/jwt");
const {SECRET} = require("../config/config");
const { log } = require('console');

exports.login = async ({email, password}) => {
    const user = await User.findOne({email});
    if(!user) {
        throw new Error("Invalid Username or Password!")
    }
    const isValid = await bcrypt.compare(password, user.password);
    if(!isValid) {
        throw new Error("Username or Password doesn't match!")
    }

    const token = generateToken(user)
    return token;
}

// exports.register = async (userData) => {
//      const user = await User.findOne({email: userData.email});

//      if(user){
//          throw new Error("Email already exists!")
//      }

//     const createdUser = await User.create(userData);
//     const token = await generateToken(createdUser);
//     return token
// }
exports.register = (userData) => User.create(userData);

async function generateToken(user){
    const payload = {
        _id: user._id,
        email: user.email
    }
    const token = await jwt.sign(payload, SECRET, {expiresIn: "2d"})
    return token
}