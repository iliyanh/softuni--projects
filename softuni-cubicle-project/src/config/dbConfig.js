const { default: mongoose } = require("mongoose")

const uri = "mongodb://127.0.0.1:27017/cubicle-september-2023";

async function dbConnect(){
    await mongoose.connect(uri)
}

module.exports = dbConnect;