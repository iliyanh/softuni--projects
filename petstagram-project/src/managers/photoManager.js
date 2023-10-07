const Photo = require("../models/Photo");

exports.create = async (photoData) => {
    const photo = new Photo(photoData);
    await photo.save();

    return photo
}
exports.getAll = () => {
    let result = Photo.find().populate("owner")

    return result
}
exports.getOne = (photoId) => Photo.findById(photoId).populate("owner");
exports.delete = (photoId) => Photo.findByIdAndDelete(photoId);
exports.edit = (photoId, photoData) => Photo.findByIdAndUpdate(photoId, photoData);
exports.addComments = async (photoId, commentData) => {
    return Photo.findByIdAndUpdate(photoId, {$push: {comments: commentData} }) 
}
exports.getByOwner = (userId) => Photo.find({owner: userId});