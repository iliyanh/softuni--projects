const router = require("express").Router();


router.get("/register", (req,res)=> {
    res.render("users/registerPage")
})
router.get("/login", (req,res)=> {
    res.render("users/loginPage")
})

module.exports = router;

