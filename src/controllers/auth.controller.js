"use strict";

const { User } = require("../models/user.model");

const passwordEncrypt = require("../helpers/passwordEncrypt");

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body; //kullanıcıdan email ve password istedik

    if (email && password) {
      //Email ve password gönderildi

      const user = await User.findOne({ email }); //!User modeline git findone yap ve burda böyle bir emaile sahip kullanıcı varmı veritabanında sorgula, varsa bana bilgilerini ver.

      if (user) {
        //User OK.

        if (user.password == passwordEncrypt(password)) {
          //Password OK.

          /* SESSION */ // session datalarımı sakladığım paramtre req.session
          // req.session = {
          //   email: user.email,
          //   password: user.password, kaydetmek istedğimiz verileri yazdık.
          // };
          // req.session.email = user.email
          req.session._id = user._id;
          req.session.password = user.password;
          /* SESSION */

          /* COOKİE */
          //Beni Hatırla: req.body ile remindMe gelirse
          if (req.body?.remindMe) {
            req.session.remindMe = true;
            //Set maxAge to 3 days:
            req.sessionOptions.maxAge = 100 * 60 * 60 * 24 * 3;
          }
          /* COOKİE */

          res.status(200).send({
            error: false,
            message: "Login OK",
            user,
          });
        } else {
          res.errorStatusCode = 401;
          throw new Error("Login parameters are not true.");
        }
      } else {
        res.errorStatusCode = 401;
        throw new Error("This user not found.");
      }
    } else {
      res.errorStatusCode = 401;
      throw new Error("Email and password are required.");
    }
  },

  logout: async (req, res) => {
    //Session /Cookie verilerini silmek içün "null" eşitlemek yeterli
    req.session = null;

    res.status(200).send({
      error: false,
      message: "Logout OK",
    });
  },
};
