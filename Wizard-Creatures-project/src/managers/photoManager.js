const Creature = require("../models/Creature");
const User = require("../models/User");

exports.create = (creaturesData) => Creature.create(creaturesData);
exports.getAll = () => {
    let result = Creature.find().populate("owner")

    return result
}
exports.getOne = (photoId) => Creature.findById(photoId).populate("votes");
exports.delete = (photoId) => Creature.findByIdAndDelete(photoId);
exports.edit = (photoId, photoData) => Creature.findByIdAndUpdate(photoId, photoData);
exports.addVote = async (photoId, votesData) => {
    return Creature.findByIdAndUpdate(photoId, {$push: {votes: votesData} }) 
}
exports.getByOwner = (userId) => Creature.find({owner: userId});
exports.findOwner = (userId) => User.findById(userId).lean();