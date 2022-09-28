const path = require("path");

const express = require("express");

const { check, body } = require("express-validator/check");

const authController = require("../controllers/auth");
const User = require("../models/user");

const router = express.Router();

router.get("/", authController.getHome);
router.get("/member", authController.getMember);
router.get("/login", authController.getLogin);
router.get("/signup", authController.getSignUp);

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("please enter a valid address")
      .normalizeEmail(),
    body("password", "password has to be valid")
      .isLength({ min: 5 })
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
  ],
  authController.postLogin
);

router.post(
  "/signup",
  [
    body("username", "please fill username box and text at least 5 characters")
      .isLength({ min: 5 })
      .trim(),

    check("email")
      .isEmail()
      .withMessage("please enter a valid email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject(
              "E-mail exists already, please pick a different one"
            );
          }
        });
      })
      .normalizeEmail(),
    body(
      "password",
      "please enter a password with only numbers and text at least 5 characters"
    )
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Password have to match");
        }
        return true;
      }),
  ],
  authController.postSignup
);

router.get("/our-story", authController.getOurStory)
router.post("/logout", authController.postLogout);

module.exports = router;
