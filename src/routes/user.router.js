"use strict";

const router = require("express").Router();
const { user } = require("../controllers/user.controller");

//Call Controllers:

// /user
router.route("/").get(user.list).post(user.create);

// /user/id
router
  .route("/:userId")
  .get(user.read)
  .put(user.update)
  .patch(user.update)
  .delete(user.delete);

module.exports = router;
