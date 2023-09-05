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
        diffculty,
    }
        = req.body;

    productManager.create({
        name,
        description,
        imageUrl,
        diffculty: Number(diffculty)
    })

    res.redirect("/")
})


module.exports = router;