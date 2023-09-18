const router = require("express").Router()

const homeControler = require("./controllers/homeControler");
const productControler = require("./controllers/productControler");
const accessoryControler = require("./controllers/accesssoryControler");
const userControler = require('./controllers/userControler');

router.use(homeControler);
router.use("/cubes", productControler);
router.use("/accessories", accessoryControler);
router.use("/users", userControler);
router.get("*", (req,res) => {
    res.redirect("/404")
})

module.exports = router