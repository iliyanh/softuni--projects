const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const photoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required!"],
        minLength: [2, "Name should be at least 2 caracters!"]
    },
    image: {
        type: String,
        required: [true, "Image is required!"],
        match: [/^http?:\/\//, "invalid url"]
    },
    age: {
        type: String,
        required: [true, "Age is required!"],
        min: [1, "Minimum age is 1!"],
        max: [100, "Maximum age is 100!"],
    },
    description: {
        type: String,
        required: [true, "Description is required!"],
        minLength: 5,
        maxLength: 50
    },
    location: {
        type: String,
        required: [true, "Location is required!"]
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    comments: [
        {
            user: {
                type: mongoose.Types.ObjectId,
                required: true,
                ref: "User",
            },
            message: {
                type: String,
                required: [true, "Comment is required!"]
            }

        }
    ]
});

const Photo = mongoose.model("Photo", photoSchema);
module.exports = Photo;