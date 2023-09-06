const router = require("express").Router();
const productManager = require("../managers/productManager");


router.get("/", (req, res) => {

    const product = productManager.getAll()
    res.render("index", { product })
})

router.get("/about", (req, res) => {
    res.render("about")
})




module.exports = router;