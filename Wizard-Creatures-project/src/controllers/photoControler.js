const router = require("express").Router();
const photoManager = require("../managers/photoManager");
const { extractErrorMessages } = require("../utils/errorHelper");
const {isAuth} = require("../middlewares/authMiddleware");
const User = require("../models/User");

router.get("/", async (req,res) => {
    const creature = await photoManager.getAll().lean()
    res.render("photos/catalog", { creature });
})

router.get("/create",isAuth, (req,res) => {
    res.render("photos/create");
})

router.post("/create",isAuth, async (req,res) => {
    
    try {
        await photoManager.create({ ...req.body, owner: req.user._id});
        res.redirect("/photos");
    } catch (err) {
        res.render("photos/create", {error: extractErrorMessages(err)})
    }
})
router.get("/:photoId/details", async (req, res) => {
    const creatureId = req.params.photoId;
    const creature = await photoManager.getOne(creatureId)
    let creaturesData = await creature.toObject();

    let isOwner = creaturesData.owner == req.user?._id;
    console.log(creaturesData.owner);
    console.log(req.user?._id);
    console.log(isOwner);
    let creaturesOwner = await photoManager.findOwner(creature.owner).lean();
    let creatureInfo = creaturesData.votes;
    
    let emails = [];
    creatureInfo.forEach(x => emails.push(x.email));
    emails.join(', ');

    let voted = creature.getVoted()
    let isVoted = req.user && voted.some(c => c._id == req.user?._id);


    res.render("details", { ...creaturesData, isOwner, isVoted, emails, creaturesOwner,creatureInfo })
})


router.get("/:photoId/delete", isAuth,async (req,res) => {
    try {
        await photoManager.delete(req.params.photoId);
        res.redirect("/")
    } catch (err) {
        res.render("photos/details" , {error: "Unsuccessful!"})
    }
})
router.get("/:photoId/edit", isAuth,async (req,res) => {
    const photoId = req.params.photoId;
    const photos = await photoManager.getOne(photoId).lean()

    res.render("photos/edit", { photos })
})

router.post("/:photoId/edit",isAuth, async (req,res) => {

    try {
        const photoData = req.body;
        const photoId = req.params.photoId;
        await photoManager.edit(photoId, photoData)

    res.redirect(`/photos/${photoId}/details`)
    } catch (err) {
        res.render("photos/edit", {error: "Unable to update photo", ...photoData})
    }

})
router.get("/:photoId/vote",isAuth, async (req, res) => {
    const creatureId = req.params.photoId
    const creature = await photoManager.getOne(creatureId);
    
    creature.votes.push(req.user);
    await creature.save();
    res.redirect(`/photos/${creatureId}/details`)


})
// router.get("/:photoId/vote",isAuth, async (req, res) => {
//     const creatureId = req.params.photoId;
//     const { email } = req.body;
//     const user = req.user._id;
    
//     await photoManager.addVote(creatureId,  {_id: user, email: email});
//     res.redirect(`/photos/${creatureId}/details`)


// })

module.exports = router;