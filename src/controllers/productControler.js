const router = require("express").Router();
const productManager = require("../managers/productManager");

router.get("/create", (req, res) => {
    console.log(productManager.getAll());
    res.render("create")
})

router.post("/create", (req, res) => {
    console.log(req.body);
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


module.exports = router;