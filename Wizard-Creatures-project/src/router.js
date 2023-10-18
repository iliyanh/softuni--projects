const router = require("express").Router();
const homeControler = require("./controllers/homeControler");
const userControler = require("./controllers/userControler");
const photoControler = require("./controllers/photoControler");

router.use(homeControler)
router.use("/users", userControler)
router.use("/photos", photoControler)
 router.get("*", (req,res) => {
     res.redirect("/404")
 })

module.exports = router;