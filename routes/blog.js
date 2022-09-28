const path = require("path");

const express = require("express");
const isAuth = require("../middleware/is-auth");
const { body } = require("express-validator/check");

const blogController = require("../controllers/blog");

const router = express.Router();

// router.get("/blogs", blogController.getMainBlog);
router.get("/add-blog", isAuth, blogController.getAddBlog);
router.get("/view-blog", isAuth, blogController.getBlogs);
router.get("/view-blog/:blogId", blogController.getBlogsDetail)
router.get("/page-blog",  blogController.getIndex);


router.post(
  "/add-blog",
  [
    body("title").isString().isLength({ min: 3 }).trim(),
    body("description").isLength({ min: 5, max: 400 }).trim(),
  ],
  isAuth,
  blogController.postAddBlog
);

router.get("/edit-blog/:blogId", isAuth, blogController.getEditBlog);

router.post(
  "/edit-blog",
  [
    body("title").isString().isLength({ min: 3 }).trim(),
    body("description").isLength({ min: 5, max: 400 }).trim(),
  ],
  isAuth,
  blogController.postEditBlog
);
router.delete("/blog/:blogId", blogController.deleteBlog);
module.exports = router;
