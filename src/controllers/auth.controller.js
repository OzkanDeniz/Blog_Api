"use strict";

const { User } = require("../models/user.model");
const passwordEncrypt = require("../helpers/passwordEncrypt");

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
      //Email ve password gönderildi

      const user = await User.findOne({ email }); //!User modeline git findone yap ve burda böyle bir emaile sahip kullanıcı varmı sorgula, varsa bana bilgilerini ver.
      if (user) {
        //User OK.

        if (user.password == passwordEncrypt(password)) {
          //Password OK.
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

  logout: async (req, res) => {},
};
