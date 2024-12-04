"use strict"

//Mongoose:
const mongoose = require("mongoose")
/*-------------------------------------------*/

const ModelSchema = new mongoose.Schema({

    fieldName:String, //Type 1.tanımlama şekli shorthand
    fieldName1:{
        type:Number,
        default:4,
        trim:true,
        unique:true,
        required:[true,"This field is required!"],
        enum: [["John","Bruce"],"Bu değerlerden biri olmalı"], //enum un anlamı Sabit Liste demek Sabit Değerler başka değer alamaz
        validate:[()=>true,"uyumsuz veri tipi"],
        get: (data)=>data,
        set: (data)=>data,
    }     




})

/*-------------------------------------------*/

//BlogCategory Schema: