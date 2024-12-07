"use strict";

// (1)require express
const express = require("express");
// (2)catch error from async:
require("express-async-errors");
// (3)app to express
const app = express();
// (4)dotenv > env
require("dotenv").config();
// (5)PORT
const PORT = process.env.PORT || 8000;

// (7)Accept json
app.use(express.json());
// (8)DB connection with normal function config içindeki dosyada mevcut
require("./src/config/dbConnection")();
// (9)DB connection with class config içindeki dosyada
// require("./src/config/dbConnection")();
/*-------------------------------------------*/

app.all("/", (req, res) => {
  res.send("WELCOME TO BLOG APİ");
});

/*-------------------------------------------*/
// Routes:

app.use("/blog/category",require("./src/routes/blogCategory.router"))
app.use("/blog/post",require("./src/routes/blogPost.router"))

/*-------------------------------------------*/
app.use("*", (req, res) => {
  res.status(404).send({ isError: true, message: "The route is not found!" });
});
/*-------------------------------------------*/
//Catch Errors:
app.use(require("./src/middlewares/errorHandler"));
/*-------------------------------------------*/
//(6)
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));
