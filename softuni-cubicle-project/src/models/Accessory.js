const mongoose = require("mongoose");

const accessoriesSchema = new mongoose.Schema({
    name: String,
    description: String,
    imageUrl: String,
})

const Accessory = mongoose.model("Accessory", accessoriesSchema);
module.exports = Accessory;