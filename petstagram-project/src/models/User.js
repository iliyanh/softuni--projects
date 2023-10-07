const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required!"],
        unique: true,
        minLength: [2, "Username must be at least 2 characters!"]
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
        minLength: [4, "Password must be at least 4 characters long!"]
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        minLength: [10, "Email must be at least 10 characters!"]
    }
})

userSchema.virtual("repeatPassword")
    .set(function(value) {
        if(value !== this.password) {
            throw new Error("Password doesn't match!")
        }
    })

userSchema.pre("save", async function(){
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash;
})    

const User = mongoose.model("User", userSchema);
module.exports = User;