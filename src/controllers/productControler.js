const router = require("express").Router();
const productManager = require("../managers/productManager");
const accessoryManager = require("../managers/accessoryManager");
const {isAuth} = require("../middlewares/authMiddleware");

router.get("/create", isAuth, (req, res) => {
    console.log(req.user);
    res.render("create")
})

router.post("/create", isAuth, async (req, res) => {
    const {
        name,
        description,
        imageUrl,
        difficultyLevel,
    }
        = req.body;

    await productManager.create({
        name,
        description,
        imageUrl,
        difficultyLevel: Number(difficultyLevel),
        owner: req.user._id
    })

    res.redirect("/")
})
router.get("/:cubeId/details", async (req, res) => {
    
    const cube = await productManager.getOneWithAccessories(req.params.cubeId).lean()
   if(!cube){
    return res.redirect("/404")
   }
   const isOwner = cube.owner?.toString() === req.user._id

   
    res.render("details", { cube , isOwner})
}) 
router.get("/:cubeId/attach-accessory", isAuth,async (req , res) => {

    const cube = await productManager.getOne(req.params.cubeId).lean();
    const accessories = await accessoryManager.getOthers(cube.accessories).lean();
    const hasAccessories = accessories.length > 0

    res.render("accessories/attach", {cube, accessories, hasAccessories});
})
router.post("/:cubeId/attach-accessory", isAuth,async (req, res) => {
    const { accessory } = req.body;

    const cubeId = req.params.cubeId;
    productManager.attachAccessory(cubeId, accessory)
    res.redirect(`/cubes/${cubeId}/details`)

})

function getDifficultyOptions(difficultyLevel){
    const titles = [
        "Very Easy",
        "Easy",
        "Medium (Standard 3x3)",
        "Intermediate",
        "Expert",
        "Hardcore",
    ]
    const options = titles.map((title, index) => ({
        title: `${index + 1} - ${title}`,
        value: index+1,
        selected: Number(difficultyLevel) === index+1,
    }))
    return options
}

router.get("/:cubeId/delete", isAuth,async(req,res) => {
    const cube = await productManager.getOne(req.params.cubeId).lean()
    const options = getDifficultyOptions(cube.difficultyLevel)
    res.render("delete", {cube, options})
})
router.post("/:cubeId/delete", isAuth,async(req,res) => {
    await productManager.delete(req.params.cubeId);
    res.redirect("/");
})


router.get("/:cubeId/edit", isAuth,async(req,res) => {
    const cube = await productManager.getOne(req.params.cubeId).lean()
    const options = getDifficultyOptions(cube.difficultyLevel)
    res.render("edit", {cube, options})
})
router.post("/:cubeId/edit", isAuth,async(req,res) => {
    const cubeData = req.body;
    await productManager.update(req.params.cubeId, cubeData);
    res.redirect(`/cubes/${req.params.cubeId}/details`);
})



module.exports = router;