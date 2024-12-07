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

      //!1.yöntem
      // validate: (email) => {
      //   return email.includes("@") && email.includes(".");
      // },
      //!2.yöntem
      // validate: (email)=>email.includes("@") && email.includes(".")
      //!3.yöntem
      validate: [
        (email) => {
          return email.includes("@") && email.includes(".");
        },
        "Email format is incorrect",
      ],
      //!4.yöntem
      // validate:{
      //   validator:(email)=>{
      //     return email.include("@") && email.includes(".");
      //   },
      //   message:"Email format is incorrect"
      // }
      //!5.yöntem
      // validate: [
      //   function (email) {
      //     console.log("this", this);
      //     return email.include("@") && email.includes(".");
      //   },
      //   "Email format is incorrect",
      // ],
    },
    //!password alanı database e direkt kaydedilmez bu nedenle hash fonksiyonu ile hashing yapılır(helper doyasında mevcut)
    password: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
      set: (password) => paswordEncypt(password),
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

module.exports = { User: mongoose.model("User", UserSchema) };
