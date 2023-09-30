const router = require("express").Router();
const productManager = require("../managers/productManager");


router.get("/", async (req, res) => {
    const { search, from, to} = req.query
    const cubes = await productManager.getAll(search, from, to)
    res.render("index", { cubes, search, from, to })
})

router.get("/about", (req, res) => {
    res.render("about")
})

router.get("/404", (req, res) => {
    res.render("404")
})


module.exports = router;