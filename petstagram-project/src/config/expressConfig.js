const express = require("express");
const cookieParser = require("cookie-parser");
const {auth} = require("../middlewares/authMiddleware");

function expressConfig(app){
    app.use(express.static("src/public"))
    app.use(express.urlencoded({extended: false}))
    app.use(cookieParser());
    app.use(auth)
}

module.exports = expressConfig;