const cookieParser = require("cookie-parser");
const express = require("express");
const { auth } = require("../middlewares/authMiddleware");



function expressConfig(app){
    // Express set up
app.use(express.static("src/public"));
app.use(express.urlencoded({extended: false}))
app.use(cookieParser());
app.use(auth);
}

module.exports = expressConfig;