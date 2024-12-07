"use strict";

const mongoose = require("mongoose");
const paswordEncypt = require("../helpers/passwordEncrypt");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Email is required"],
    },
    //!password alanı database e direkt kaydedilmez bu nedenle hash fonksiyonu ile hashing yapılır(helper doyasında mevcut)
    password: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
      set: (password)=>paswordEncypt(password)
      //set:paswordEncypt buradaki kullanım adresini (paswordEncypt) temsil eder
    },
    firstname: String,
    lastname: String,
  },
  {
    collection: "users",
    timestamps: true,
  }
);

module.exports = { Users: mongoose.model("Users", UserSchema) };
