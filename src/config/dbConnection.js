"use strict";

const mongoose = require("mongoose");

const { customErrors } = require("../errors/customErrors");

//(8)DB connection with normal function config içindeki dosyada
const dbConnection = () => {
  if (!process.env.MONGODB_URI) {
    throw new customErrors("mongodb url is necessary!");
  }
  try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log("database connection is succesfully");
  } catch (error) {
    console.log("database connection error");
  }
};

/*------------------------------------------------------
//! # private, _ ile başlayan dışarıdan erişilmemeli
class DatabaseConnection {
    constructor() {
      this.#_connect();
    }
  
    #_connect() {
      if (!process.env?.MONGODB)
        throw new CustomError("mongodb uri is necessary", 500);
      mongoose
        .connect(process.env?.MONGODB)
        .then(() => {
          console.log("Database connection successful");
        })
        .catch((err) => {
          console.error("Database connection error");
        });
    }
  }

  module.exports=new DatabaseConnection()
/*------------------------------------------------------*/

module.exports = dbConnection;
