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
    //findone({filter},{query},{options})
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
    const result = BlogCategory.updateOne(
      { _id: req.params.categoryId },
      req.body
    );
    if (result.matchedCount === 0) {
      //throw new CustomError("No matching documents found")
      return res.status(404).send("No matching documents found");
    }

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