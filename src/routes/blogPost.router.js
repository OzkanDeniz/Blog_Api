"use strict";

const router = require("express").Router();
const { blogPost } = require("../controllers/blogPost.controller");

//Call Controllers:

// /blog/category/
router.route("/").get(blogPost.list).post(blogPost.create);

// /blog/category/id
router
  .route("/:postId")
  .get(blogPost.read)
  .put(blogPost.update)
  .patch(blogPost.update)
  .delete(blogPost.delete);

module.exports = router;
