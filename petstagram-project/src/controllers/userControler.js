const router = require("express").Router();
const userManager = require("../managers/userManager");
const {extractErrorMessages} = require("../utils/errorHelper");

router.get("/login", (req,res) => {
    res.render("users/login")
})
router.post("/login", async (req,res) => {
    const {username, password} = req.body;
    try {
        const token = await userManager.login(username, password);
    res.cookie("auth", token, {httpOnly: true});

    res.redirect("/")
    } catch (err) {
        res.render("users/login", { error: extractErrorMessages(err) })
    }
    
})

router.get("/register", (req,res) => {
    res.render("users/register")
})
router.post("/register", async (req,res) => {
    const { username, email, password, repeatPassword} = req.body;
    try {
        const token = await userManager.register({ username, email,password, repeatPassword})
        res.cookie("auth", token);
        res.redirect("/")
    } catch (err) {
        
        res.render("users/register", { error: extractErrorMessages(err), username, email })
    }
    
})

router.get("/logout", (req, res) => {
    res.clearCookie("auth");
    res.redirect("/")
})


module.exports = router;