const router = require("express").Router();
const productManager = require("../managers/productManager");

router.get("/create", (req, res) => {
    console.log(productManager.getAll());
    res.render("create")
})

router.post("/create", (req, res) => {
    const {
        name,
        description,
        imageUrl,
        difficultyLevel,
    }
        = req.body;

    productManager.create({
        name,
        description,
        imageUrl,
        difficultyLevel: Number(difficultyLevel),
    })

    res.redirect("/")
})
router.get("/:cubeId/details", (req, res) => {
    
    const cube = productManager.getOne(req.params.cubeId)
   if(!cube){
    return res.redirect("/404")
   }
    res.render("details", { cube })
}) 


module.exports = router;