const express = require("express");
const router = require("./router");
const expressConfig = require("./config/expressConfig");
const handlebarsConfig = require("./config/handlebarsConfig");
const dbConnect = require("./config/DBconfig");
 

const app = express();
const PORT = 3000;

expressConfig(app);
handlebarsConfig(app)

dbConnect()
    .then(() => console.log("DB connected successfully!"))
    .catch(error => console.log("DB Error:", error.message))

app.use(router)

app.listen(PORT, console.log(`Server is listening on port ${PORT}`));