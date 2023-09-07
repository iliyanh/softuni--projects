const router = require("express").Router()

const homeControler = require("./controllers/homeControler");
const productControler = require("./controllers/productControler");

router.use(homeControler);
router.use("/cubes", productControler);
router.get("*", (req,res) => {
    res.redirect("/404")
})

module.exports = router