// const mongoose = require("mongoose");

// const fileHelper = require("../util/file");

// const { validationResult } = require("express-validator");

// const Blog = require("../models/blog");

// exports.getAddBlog = (req, res, next) => {
//   res.render("admin/edit-blog", {
//     pageTitle: "Add blog",
//     path: "/admin/add-blog",
//     editing: false,
//     hasError: false,
//     errorMessage: null,
//     validationResult: [],
//   });
// };

// exports.postAddProduct = (req, res, next) => {
//   const title = req.body.title;
//   const image = req.file;
//   const description = req.body.description;
//   // const tag = req.body.tag;

//   if (!image) {
//     return res.status(422).render("admin/edit-blog", {
//       pageTitle: "Add Blog",
//       path: "/admin/-add-blog",
//       editing: true,
//       blog: {
//         title: title,
//         image: image,
//         description: description,
//         // tag: tag
//       },
//       errorMessage: "attached file is not an image",
//       validationErrors: [],
//     });
//   }
//   const errors = validationResult(req);

//   if (!errors.isEmpty()) {
//     console.log(errors.array());
//     return res.status(422).render("admin/edit-blog", {
//       pageTitle: "Add Blog",
//       path: "/admin/add-blog",
//       editing: false,
//       hasError: true,
//       blog: {
//         title: title,
//         image: image,
//         description: description,
//         // tag:tag
//       },
//       errorMessage: errors.array()[0].msg,
//       validationErrors: errors.array(),
//     });
//   }
//   const imageUrl = image.path;

//   const blog = new Blog({
//     title: title,
//     image: image,
//     description: description,
//     // tag:tag,
//     userId: req.user,
//   });
//   blog
//     .save()
//     .then((result) => {
//       console.log("Created Blog");
//       res.redirect("/admin/blogs");
//     })
//     .catch((err) => {
//       const error = new Error(err);
//       error.httpStatusCode = 500;
//       return next(error);
//     });
// };

// exports.getEditBlog = (req, res, next) => {
//   const editMode = req.query.edit;
//   if (!editMode) {
//     return res.redirect("/");
//   }
//   const blogsId = req.params.blogId;
//   Blog.findById(blogsId)
//     .then((blog) => {
//       if (!blog) {
//         return res.redirect("/");
//       }
//       res.render("admin/edit-blog", {
//         pageTitle: "edit-blog",
//         path: "/admin/edit-blog",
//         editing: editMode,
//         product: product,
//         hasError: false,
//         errorMessage: null,
//         validationErrors: [],
//       });
//     })
//     .catch((err) => {
//       const error = new Error(err);
//       error.httpStatusCode = 500;
//       return next(error);
//     });
// };

// exports.postEditBlog = (req, res, next) => {
//   const blogsId = req.body.blogId;
//   const updateTitle = req.body.title;
//   const updateImage = req.file;
//   const updateDescription = req.body.description;
//   // const updateTag= req.body.tag

//   const errors = validationResult(req);

//   if (!errors.isEmpty()) {
//     return res.status(422).render("admin/edit-blog", {
//       pageTitle: "Edit Blog",
//       path: "/admin/edit-blog",
//       editing: true,
//       hasError: true,
//       product: {
//         title: updateTitle,
//         image: updateImage,
//         description: updateDescription,
//         _id: prodId,
//       },
//       errorMessage: errors.array()[0].msg,
//       validationErrors: errors.array(),
//     });
//   }
//   Blog.findById(prodId)
//     .then((blog) => {
//       if (blog.userId.toString() !== req.user_id.toString()) {
//         return res.redirect("/");
//       }
//       (blog.title = updateTitle),
//         (blog.image = updateImage),
//         (blog.description = updateDescription);
//       if (image) {
//         fileHelper.deleteFile(blog.imageUrl);
//         blog.imageUrl = image.path;
//       }
//       return blog.save().then((result) => {
//         console.log("update blog");
//         res.redirect("/admin/blogs");
//       });
//     })
//     .catch((err) => {
//       const error = new Error(err);
//       error.httpStatusCode = 500;
//       return next(error);
//     });
// };

// exports.getProducts = (req, res, next) => {
//   Blog.find({ userId: req.user._id })
//     .then((blog) => {
//       console.log(blog);
//       res.render("admin/blogs", {
//         blog: blog,
//         pageTitle: "Admin Blog",
//         path: "/admin/blogs",
//       });
//     })
//     .catch((err) => {
//       const error = new Error(err);
//       error.httpStatusCode = 500;
//       return next(error);
//     });
// };

// exports.deleteProduct = (req, res, next) => {
//   const blogId = req.params.blogId;
//   Blog.findById(blogId)
//     .then((blog) => {
//       if (!blog) {
//         return next(new Error("Blog not found"));
//       }
//       fileHelper.deleteFile(blog.imageUrl);
//       return Blog.deleteOne({ _id: blogId, userId: req.user._id });
//     })
//     .then(() => {
//       console.log("destroyed blog");
//       res.status(200).json({ message: "success" });
//     })
//     .catch((err) => {
//       res.status(500).json({ message: "Delete blog" });
//     });
// };
