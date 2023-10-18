const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Username is required!"],
        minLength: [3, "Username must be at least 3 characters!"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required!"],
        minLength: [3, "Last name must be at least 3 characters!"]
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        minLength: [10, "Email must be at least 10 characters!"]
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
        minLength: [4, "Password must be at least 4 characters long!"]
    },
    
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