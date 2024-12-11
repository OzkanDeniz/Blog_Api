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

// const { User } = require("./src/models/user.model");

// app.use(async (req, res, next) => {

//   console.log("Session", req.session);

//   // login olan user datasını buraya kaydedeceğiz.
//   req.user = null

//   if (req.session?._id) {
//     //session da data varmı eğer varsa

//     const { _id, password } = req.session; //varsa bu dataları al

//     const user = await User.findOne({ _id }); // bu _id userı kontrol et

//     if (user && user.password == password) {
//       //Login Başarılı!
//       // bu user veri tabanında varmı? && kullanıcı parolasıyla cookie deki parola aynımı değiştirmiş olabilir!
//       req.user = user; //Session içindeki login olmuş olan user datası başarılı ise user versini req.user'a ata.
//     } else {
//       //kullanıcıyı bulamıyor ve ya passwordu doğrulayamıyorsa o zaman session daki datayı sil
//       req.user=null
//       req.session = null;
//     }
//   }

//   next();
// });
//!useControl middleware e taşındı

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
    user:req.user,
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
