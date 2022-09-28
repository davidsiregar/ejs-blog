// const path = require("path");

// const express = require("express");
// const { body } = require("express-validator");

// const adminController = require("../controllers/admin");
// const isAuth = require("../middleware/is-auth");

// const router = express.Router();

// router.get("/add-blog", isAuth, adminController.getAddBlog);

// router.get("/blogs", isAuth, adminController.getProducts);

// router.post(
//   "/add-blog",
//   [
//     body("title").isString().isLength({ min: 3 }).trim(),
//     body("description").isLength({ min: 5, max: 400 }).trim(),
//   ],

//   isAuth,
//   adminController.postAddProduct
// );

// router.get("/edit-blog/:blogId", isAuth, adminController.getEditBlog);

// router.post(
//   "/edit-product",
//   [
//     body("title").isString().isLength({ min: 3 }).trim(),
//     body("description").isLength({ min: 5, max: 400 }).trim(),
//   ],
//   isAuth,
//   adminController.postEditBlog
// );

// router.delete("/blog/:blogId", isAuth, adminController.postEditBlog);

// module.exports = router;
