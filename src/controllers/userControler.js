const router = require("express").Router();
const userManager = require("../managers/userManager");

router.get("/register", (req,res)=> {
    res.render("users/registerPage")
})
router.post("/register", async (req,res)=> {
    const { username, password, repeatPassword} = req.body;
    await userManager.register({ username, password, repeatPassword})
    res.redirect("/users/login")
})
router.get("/login", (req,res)=> {
    res.render("users/loginPage")
})

router.post("/login", async (req,res)=> {
    const {username, password} = req.body;

    const user = await userManager.login(username, password);

    res.redirect("/")
})

module.exports = router;

