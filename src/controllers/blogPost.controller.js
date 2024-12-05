"use strict";

const { NotFoundError } = require("../errors/customErrors");
const { blogPost } = require("../models/BlogPost.model");

module.exports.blogPost = {
  list: async (req, res) => {
    const data = await BlogPost.find();
    res.send({
      result: data,
    });
  },

  // CRUD ->

  create: async (req, res) => {
    const result = await BlogPost.create(req.body);
    res.send({
      result,
    });
  },

  read: async (req, res) => {
    //findone({filter},{query},{options})
    const result = await BlogPost.findOne(
      { _id: req.params.postId },
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
    const result = BlogPost.updateOne(
      { _id: req.params.postId },
      req.body
    );
    if (result.matchedCount === 0) {
      //throw new CustomError("No matching documents found")
      return res.status(404).send("No matching documents found");
    }

    res.status(202).send({
      isError: false,
      result,
      new: await BlogPost.findOne({ _id: req.params.categoryId }),
    });
  },

  delete: async (req, res) => {
    const result = await BlogPost.deleteOne({ _id: req.params.categoryId });
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
