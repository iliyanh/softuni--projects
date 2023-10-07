const { Mongoose, MongooseError } = require("mongoose")

exports.extractErrorMessages = (error) => {
    if (error instanceof MongooseError){
        return Object.values(error.errors)[0].message;
    }else {
        return error.message;
    }
}