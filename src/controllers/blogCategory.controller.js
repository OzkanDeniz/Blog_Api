"use strict";

const { NotFoundError } = require("../errors/customErrors");
const { BlogCategory } = require("../models/blogCategory.model");

// BlogCategory Controller:

module.exports.blogCategory = {
  list: async (req, res) => {
    const data = await BlogCategory.find();
    res.send({
      result: data,
    });
  },

  // CRUD ->

  create: async (req, res) => {
    const result = await BlogCategory.create(req.body);
    res.send({
      result,
    });
  },

  read: async (req, res) => {
    //! findone({filter},{projection})
    //! findone({filter},{projection}).limit(10)..sort({createdAt: -1}).skip(5)
    // const id=req.params.categoryId

    const result = await BlogCategory.findOne(
      { _id: req.params.categoryId },
      { _id: 0, name: 1 }
    );
    if (!result) {
      throw new NotFoundError("No matching documents found");
    }
    res.send({
      isError: false,
      result,
    });
  },

  //matchedCount = 0,1,2   modifiedCount = 0,1
  update: async (req, res) => {
    //updateone({filter},{update},{options})
    //!findByIdAndUpdate=> findOne+updateOne sadece id  ister
    //  const updateUser = awair User.findByIdAndUpdate(
    // "6jkıofsjj5432j4jp", _id
    //  {name:"John"},
    //  {new:true} Güncellenmiş veriyi retrun eder

    //options=> upsert:Belge bulunmazsa yeni bir belge oluştur.(true veya false , default:false)

    
    const result = await BlogCategory.updateOne(
      { _id: req.params.categoryId },
      req.body
    );
    //matcchedCount:0,1,2(güncellenecek veri bulundumu)     modifiedCount=0,1(update işlemi yapıldımı) 
    if (result.matchedCount === 0) {
      //throw new CustomError("No matching documents found")
      return res.status(404).send("No matching documents found");
    }
    //result içinde değer gelmez sadece bilgi verilir
    res.status(202).send({
      isError: false,
      result,
      new: await BlogCategory.findOne({ _id: req.params.categoryId }),
    });
  },

  delete: async (req, res) => {
    const result = await BlogCategory.deleteOne({ _id: req.params.categoryId });
    //deletedCount
    if (result.deletedCountt === 0) {
      throw new CustomError("No matching documents found");
      //   return res.status(404).send("No matching documents found");
    }
    //! 204 ile veri gönderilmez No_Content
    res.status(204).send({
      result,
    });
  },
};
