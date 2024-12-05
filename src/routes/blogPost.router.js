"use strict";

const router = require("express").Router();
const { BlogPost } = require("../controllers/BlogPost.controller");

//Call Controllers:

// /blog/category/
router.route("/category").get(BlogPost.list).post(BlogPost.create);

// /blog/category/id
router
  .route("/:categoryId")
  .get(BlogPost.read)
  .put(BlogPost.update)
  .patch(BlogPost.update)
  .delete(BlogPost.delete);

module.exports = router