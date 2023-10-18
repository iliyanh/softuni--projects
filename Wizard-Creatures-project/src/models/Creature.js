const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const creatureSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required!"],
        minLength: [2, "Name should be at least 2 caracters!"]
    },
    species: {
        type: String,
        required: [true, "Species is required!"],
        minLength: [3, "Species should be at least 3 characters!"]
    },
    skinColor: {
        type: String,
        required: true,
        minLength: [3, "Skin color should be at least 3 characters!"]
    },
    eyeColor: {
        type: String,
        required: true,
        minLength: [3, "Eye color should be at least 3 characters!"]
    },
    image: {
        type: String,
        required: [true, "Image is required!"],
        match: [/^https?:\/\//i, "invalid url"]
    },
    description: {
        type: String,
        required: [true, "Description is required!"],
        minLength: 5,
        maxLength: 500,
    },
    votes: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User",
        }
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },

});
creatureSchema.method("getVoted", function () {
    return this.votes.map(x=> x._id);
})

const Creature = mongoose.model("Creature", creatureSchema);
module.exports = Creature;