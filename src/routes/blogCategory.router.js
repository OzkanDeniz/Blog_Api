"use strict";

const router = require("express").Router();
const { blogCategory } = require("../controllers/blogCategory.controller");

//Call Controllers:

// /blog/category/
router.route("/").get(blogCategory.list).post(blogCategory.create);

// /blog/category/id
router
  .route("/:categoryId")
  .get(blogCategory.read)
  .put(blogCategory.update)
  .patch(blogCategory.update)
  .delete(blogCategory.delete);

module.exports = router