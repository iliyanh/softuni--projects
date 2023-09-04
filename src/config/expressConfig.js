const express = require("express");

function expressConfig(app){
    // Express set up
app.use(express.static("src/public"));
app.use(express.urlencoded({extended: false}))
}

module.exports = expressConfig;