const router = require("express").Router();
const photoManager = require("../managers/photoManager");
const { extractErrorMessages } = require("../utils/errorHelper");
const {isAuth} = require("../middlewares/authMiddleware");

router.get("/", async (req,res) => {
    const photos = await photoManager.getAll().lean()
    res.render("photos/catalog", { photos });
})

router.get("/create",isAuth, (req,res) => {
    res.render("photos/create");
})

router.post("/create",isAuth, async (req,res) => {
    const photoData = {
        ...req.body,
        owner: req.user._id,
     }
    try {
        await photoManager.create(photoData);
        res.redirect("/photos");
    } catch (err) {
        res.render("photos/create", {error: extractErrorMessages(err)})
    }
})
router.get("/:photoId/details", async (req, res) => {
    const photoId = req.params.photoId;
    const photos = await photoManager.getOne(photoId).populate("comments.user").lean()
    const isOwner = req.user?._id == photos.owner._id;


    res.render("details", { photos, isOwner })
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
router.post("/:photoId/comments",isAuth, async (req, res) => {
    const photoId = req.params.photoId;
    const { message } = req.body;
    const user = req.user._id;
    
    await photoManager.addComments(photoId, {user, message});
    res.redirect(`/photos/${photoId}/details`)


})

module.exports = router;