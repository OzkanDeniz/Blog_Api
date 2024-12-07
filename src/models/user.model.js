"use strict";

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Email is required"],
    },
    //!password alanı database e direkt kaydedilmez
    password: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
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
