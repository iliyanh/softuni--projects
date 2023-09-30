const router = require("express").Router();
const userManager = require("../managers/userManager");
const {extractErrorMessages} = require("../utils/errorHelper");

router.get("/register", (req,res)=> {
    res.render("users/registerPage")
})
router.post("/register", async (req,res)=> {
    const { username, password, repeatPassword} = req.body;
    try {
        await userManager.register({ username, password, repeatPassword})
        res.redirect("users/login")
    } catch (error) {
        const errorMessage = extractErrorMessages(error)
        res.status(404).render("users/registerPage", {errorMessage})
    }
    
})
router.get("/login", (req,res)=> {
    res.render("users/loginPage")
})

router.post("/login", async (req,res)=> {
    const {username, password} = req.body;

    const token = await userManager.login(username, password);
    res.cookie("auth", token, {httpOnly: true});

    res.redirect("/")
})
router.get("/logout", (req, res) => {
    res.clearCookie("auth");
    res.redirect("/")
})

module.exports = router;

