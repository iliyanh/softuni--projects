const router = require("express").Router();
const productManager = require("../managers/productManager");
const accessoryManager = require("../managers/accessoryManager");

router.get("/create", (req, res) => {
    console.log(req.user);
    res.render("create")
})

router.post("/create", async (req, res) => {
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
    })

    res.redirect("/")
})
router.get("/:cubeId/details", async (req, res) => {
    
    const cube = await productManager.getOneWithAccessories(req.params.cubeId).lean()
   if(!cube){
    return res.redirect("/404")
   }
    res.render("details", { cube })
}) 
router.get("/:cubeId/attach-accessory", async (req , res) => {

    const cube = await productManager.getOne(req.params.cubeId).lean();
    const accessories = await accessoryManager.getOthers(cube.accessories).lean();
    const hasAccessories = accessories.length > 0

    res.render("accessories/attach", {cube, accessories, hasAccessories});
})
router.post("/:cubeId/attach-accessory", async (req, res) => {
    const { accessory } = req.body;

    const cubeId = req.params.cubeId;
    productManager.attachAccessory(cubeId, accessory)
    res.redirect(`/cubes/${cubeId}/details`)

})


module.exports = router;