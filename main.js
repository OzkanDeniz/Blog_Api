"use strict";

//require express
const express = require("express");
//catch error from async:
require("express-async-errors");
//app to express
const app = express();
//dotenv > env
require("dotenv").config();
//PORT
const PORT = process.env.PORT || 8000;
/*-------------------------------------------*/

app.all("/", (req, res) => {
  res.send("WELCOME TO BLOG APİ");
});

app.use("*", (req, res) => {
  res.status(404).send({ isError: true, message: "The route is not found!" });
});

app.use(require("./middlewares/errorHandler"));

/*-------------------------------------------*/
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));
