"use strict";

//Mongoose:
const mongoose = require("mongoose");
/*-------------------------------------------*

const ModelSchema = new mongoose.Schema({
  fieldName: String, //Type 1.tanımlama şekli shorthand
  fieldName1: {
    type: Number,
    default: 4,
    trim: true,
    unique: true,
    required: [true, "This field is required!"],
    enum: [["John", "Bruce"], "Bu değerlerden biri olmalı"], //enum un anlamı Sabit Liste demek Sabit Değerler başka değer alamaz
    validate: [() => true, "uyumsuz veri tipi"],
    get: (data) => data,
    set: (data) => data,
    index:true
  },
},{
    collation:"tableName", //tablo ismi
    timestamps:true //zaman damgası ctreated,update time
});

const ModelName = mongoose.model("modelName",ModelSchema)
module.exports = {ModelName}
/*-------------------------------------------*/
//BlogCategory Schema:

const BlogCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    collection: "blogCategories",
    timestamps: true,
  }
);
module.exports = {
  BlogCategory: mongoose.model("BlogCategory", BlogCategorySchema),
};
