"use strict";

const router = require("express").Router();
const { blogPost } = require("../controllers/blogPost.controller");

//Call Controllers:

// /blog/post/
router.route("/").get(blogPost.list).post(blogPost.create);

// /blog/post/id
router
  .route("/:postId")
  .get(blogPost.read)
  .put(blogPost.update)
  .patch(blogPost.update)
  .delete(blogPost.delete);

module.exports = router;
