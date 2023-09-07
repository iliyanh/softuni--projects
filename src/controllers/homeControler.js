const router = require("express").Router();
const productManager = require("../managers/productManager");


router.get("/", (req, res) => {

    const cubes = productManager.getAll()
    res.render("index", { cubes })
})

router.get("/about", (req, res) => {
    res.render("about")
})

router.get("/404", (req, res) => {
    res.render("404")
})


module.exports = router;