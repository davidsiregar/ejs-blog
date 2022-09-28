const mongoose = require("mongoose");

const fileHelper = require("../util/file");

const { validationResult } = require("express-validator/check");

const Blog = require("../models/blog");

const ITEMS_PER_PAGE = 2;

exports.getMainBlog = (req, res, next) => {
  res.render("blog/blog-main");
};

exports.getAddBlog = (req, res, next) => {
  res.render("blog/blog-add", {
    pageTitle: "Add Blog",
    path: "/blog/add-blog",
    editing: false,
    hasError: false,
    errorMessage: null,
    validationErrors: [],
  });
};

exports.postAddBlog = (req, res, next) => {
  const title = req.body.title;
  const image = req.file;
  const description = req.body.description;

  if (!image) {
    return res.status(422).render("blog/blog-add", {
      pageTitle: "Add Blog",
      path: "/blog/add-blog",
      editing: false,
      hasError: true,
      blog: {
        title: title,
        description: description,
      },
      errorMessage: "Attached file is not an image",
      validationResult: [],
    });
  }
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render("blog/blog-add", {
      pageTitle: "Add Blog",
      path: "/blog/add-blog",
      editing: false,
      hasError: true,
      blog: {
        title: title,
        description: description,
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
    });
  }

  const imageUrl = image.path;

  const blog = new Blog({
    title: title,
    imageUrl: imageUrl,
    description: description,
    userId: req.user,
  });
  blog
    .save()
    .then((result) => {
      console.log("Created Blog");
      res.redirect("/blog/view-blog");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getEditBlog = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/blog/view-blog");
  }

  const blogId = req.params.blogId;
  Blog.findById(blogId)
    .then((blog) => {
      if (!blog) {
        return res.redirect("/blog/view-blog");
      }
      res.render("blog/blog-add", {
        pageTitle: "Edit Blog",
        path: "/blog/edit-blog",
        editing: editMode,
        blog: blog,
        hasError: false,
        errorMessage: null,
        validationErrors: [],
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postEditBlog = (req, res, next) => {
  const blogId = req.body.blogId;
  const updateTitle = req.body.title;
  const image = req.file;
  const updateDescription = req.body.description;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render("blog/blog-add", {
      pageTitle: "Edit Blog",
      path: "/blog/edit-blog",
      editing: true,
      hasError: true,
      blog: {
        title: updateTitle,
        description: description,
        _id: blogId,
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
    });
  }
  Blog.findById(blogId)
    .then((blog) => {
      if (blog.userId.toString() !== req.user._id.toString()) {
        return res.redirect("/blog/view-blog");
      }
      blog.title = updateTitle;
      blog.description = updateDescription;
      if (image) {
        fileHelper.deleteFile(blog.imageUrl);
        blog.imageUrl = image.path;
      }
      return blog.save().then((result) => {
        console.log("Update Blog");
        res.redirect("/blog/view-blog");
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getBlogs = (req, res, next) => {
  Blog.find({ userId: req.user._id })
    // .populate("username")
    .then((blog) => {
      console.log(blog);
      res.render("blog/blog-main", {
        blogs: blog,
        pageTitle: "Admin Blog",
        path: "/blog/view-blog",
      });
    })

    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getBlogsDetail=(req,res,next)=>{
  const blogId = req.params.blogId;
  Blog.findById(blogId)
  .then((blog)=>{
    res.render("blog/blog-detail",{
      blog:blog,
      pageTitle: blog.title,
      path: "/blog/view-blog"
    })
  })
  .catch((err)=>{
    const error = new Error(err)
    error.httpStatusCode=500;
    return next(error)
  })
}

exports.getIndex=(req,res,next)=>{
   const page =+req.query.page || 1;
   let totalItems;

   Blog.find()
   .countDocuments()
   .then((numBlogs)=>{
    totalItems=numBlogs
    return Blog.find()
    .skip((page-1)* ITEMS_PER_PAGE)
    .limit(ITEMS_PER_PAGE)
   })
   .then((blog)=>{
    res.render("blog/blog-page",{
      blogs:blog,
      pageTitle: "Page Blog",
      path: "/blog/page-blog",
      currentPage: page,
      hasNextPage: ITEMS_PER_PAGE * page <totalItems,
      hasPreviousPage: page>1,
      nextPage: page+1,
      previousPage: page-1,
      lastPage: Math.ceil(totalItems/ ITEMS_PER_PAGE)
    })
   })
   .catch((err)=>{
    const error = new Error(err)
    error.httpStatusCode=500
    return next(error)
   })
}
exports.deleteBlog = (req, res, next) => {
  const blogId = req.params.blogId;
  Blog.findById(blogId)
    .then((blog) => {
      if (!blog) {
        return next(new Error("Blog not found."));
      }
      fileHelper.deleteFile(blog.imageUrl);
      return Blog.deleteOne({ _id: blogId, userId: req.user._id });
    })
    .then(() => {
      console.log("destroyed Blog");
      res.status(200).json({ message: "Success!" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Deleting blog failed" });
    });
};

exports.getViewBlog = (req, res, next) => {
  res.render("blog/view-blog");
};
