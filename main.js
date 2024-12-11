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

/*-------------------------------------------*/
//*(14) SESSIONS & COOKİES
// npm i cookie-session

const session = require("cookie-session");

//Run with general settings:
app.use(
  session({
    secret: process.env.SECRET_KEY, // Cookie datasını şifreleme anahtarı.
    // maxAge: 1000 * 60 * 60 * 24 * 3, // miliSeconds // 3 days
  })
); //middleware ise app.use() kullanılır.
/*-------------------------------------------*/
//(15) Check user-data from session:

//Moved to file:
app.use(require("./src/middlewares/userControl"))

/*-------------------------------------------*/
//(13) Routes:
app.use("/blog/category", require("./src/routes/blogCategory.router"));
app.use("/blog/post", require("./src/routes/blogPost.router"));
app.use("/blog/user", require("./src/routes/user.router"));
app.use("/auth", require("./src/routes/auth.router")); //login logout
//(10) URL("/")
app.all("/", (req, res) => {
  // res.send("WELCOME TO BLOG APİ");
  res.send({
    message: "WELCOME TO BLOG API",
    user:req.user, // Logined user data
    session: req.session,
  });
});

/*-------------------------------------------*/
//(11) URL("*")
app.use("*", (req, res) => {
  res.status(404).send({ isError: true, message: "The route is not found!" });
});
/*-------------------------------------------*/
// (12)Catch Errors:
app.use(require("./src/middlewares/errorHandler"));
/*-------------------------------------------*/
//(6)
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));
