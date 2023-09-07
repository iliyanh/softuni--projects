const router = require("express").Router();
const productManager = require("../managers/productManager");


router.get("/", (req, res) => {

    const cubes = productManager.getAll()
    res.render("index", { cubes })
})

router.get("/about", (req, res) => {
    res.render("about")
})




module.exports = router;