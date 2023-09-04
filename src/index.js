const express = require("express");
const handlebars = require("express-handlebars");
const expressConfig = require("./config/expressConfig");
const handlebarsConfig = require("./config/handlebarsConfig");
const homeControler = require("./controllers/homeControler");
const productControler = require("./controllers/productControler");

const app = express();
const PORT = 3000

expressConfig(app)
handlebarsConfig(app)

app.use(homeControler);
app.use("/cubes", productControler);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))