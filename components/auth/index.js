const express = require("express");
const router = express.Router();

const authController = require("./authController");
const passport = require("./passport");
const auth = require("../../middlewares/auth");

// router.get("/register", authController.showRegistrationForm);
// router.post("/register", authController.register);

router.get("/", authController.showLoginForm);
router.post(
    "/",
    passport.authenticate("local", {
        successRedirect: "/accounts/",
        // failureRedirect: "/auth/login",
        failWithError: true,
    }),
    function (err, req, res, next) {
        // handle error
        return res.render('auth/login', { layout: false, error: err.message });
    }
);

// router.get("/forgotpassword", authController.showForgetPasswordForm);
// router.post("/forgotpassword", authController.forgetPassword);

// router.get("/resetpassword/:id", authController.showResetPasswordForm);
// router.post("/resetpassword", authController.resetPassword);

router.get("/logout", auth, authController.logout);

module.exports = router;
