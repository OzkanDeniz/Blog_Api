"use strict";

// Middleware: User check from session

const { User } = require("../models/user.model");

module.exports = async (req, res, next) => {
  console.log("Session", req.session);

  // login olan user datasını buraya kaydedeceğiz.
  req.user = null;

  if (req.session?._id) {
    //session da data varmı eğer varsa

    const { _id, password } = req.session; //varsa bu dataları al

    const user = await User.findOne({ _id }); // bu _id userı kontrol et

    if (user && user.password == password) {
      //Login Başarılı!
      // bu user veri tabanında varmı? && kullanıcı parolasıyla cookie deki parola aynımı değiştirmiş olabilir!
      req.user = user; //Session içindeki login olmuş olan user datası başarılı ise user versini req.user'a ata.
    } else {
      //kullanıcıyı bulamıyor ve ya passwordu doğrulayamıyorsa o zaman session daki datayı sil
      req.user = null;
      req.session = null;
    }
  }

  next();
};
