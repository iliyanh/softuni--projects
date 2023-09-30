const express = require("express");
const handlebars = require("express-handlebars");
const expressConfig = require("./config/expressConfig");
const handlebarsConfig = require("./config/handlebarsConfig");
const router = require("./router");
const dbConnect = require("./config/dbConfig");

const app = express();
const PORT = 3000

expressConfig(app)
handlebarsConfig(app)

dbConnect()
    .then(() => {
        console.log("DB Connected Successfully");
    })
    .catch((error) => {
        console.log(("DB error:", error));
    })

app.use(router)


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))