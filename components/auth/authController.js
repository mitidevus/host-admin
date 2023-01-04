// const Ajv = require('ajv');
// const addFormats = require('ajv-formats');

const authService = require('./authService');

// const registerSchema = require('./schemas/register');
// const resetPasswordSchema = require('./schemas/resetPassword');

// const emailService = require('../../helps/sendEmail');

// const ajv = new Ajv();
// addFormats(ajv);

// exports.showRegistrationForm = (req, res) => {
//   res.render('auth/register');
// };

// exports.register = async (req, res) => {
//   // syntax validation
//   if (!ajv.validate(registerSchema, req.body)) {
//     res.render('auth/register', { error: 'Invalid input!' });
//     return;
//   }

//   const { fullname, email, address, password, re_password } = req.body;

//   if (password !== re_password) {
//     res.render('auth/register', { error: 'Password does not match!' });
//     return;
//   }

//   try {
//     await authService.register(fullname, email, address, password);

//     const user = await authService.getUserByEmail(email);
//     console.log("user: ", user);
//     if (!user) {
//       console.log("user null");
//       return;
//     }

//     req.login(user, function (err) {
//       if (err) {
//         return next(err);
//       }
//       return res.redirect('/');
//     });
//   } catch (e) {
//     res.render('auth/register', { error: e.message }); //kt mail có dùng để đăng ký hay chưa
//     return;
//   }
// };

exports.showLoginForm = (req, res) => {
    res.render('auth/login', { layout: false });
};

// exports.showForgetPasswordForm = (req, res) => {
//   res.render('auth/forgotPassword/forgot-password');
// };

// exports.forgetPassword = async (req, res) => {
//   const email = req.body.email;
//   console.log("email: ", email);
//   const user = await authService.getUserByEmail(email);
//   if (!user) {
//     return res.render("auth/forgotPassword/forgot-password", { error: "Email not exist" });
//   }

//   const result = await emailService.sendMail(
//     email,
//     "Reset pasword",
//     `Click on the following link to reset your password: ${req.protocol}://${req.get("host")}/auth/resetpassword/${user.user_Id}`
//   );

//   res.render("auth/forgotPassword/forgot-password", { message: "Please check your mail to reset your password" });
// };

// exports.showResetPasswordForm = async (req, res) => {
//   const userId = req.params.id;
//   console.log("userId: ", userId)
//   const user = await authService.getUserById(userId);
//   console.log("user: ", user);
//   if (!user) {
//     res.render("errors/404");
//     return;
//   }

//   res.render("auth/forgotPassword/reset-password", { id: req.params.id });
// };

// exports.resetPassword = async (req, res) => {
//   console.log("req.body: ", req.body);
//   // syntax validation
//   if (!ajv.validate(resetPasswordSchema, req.body)) {
//     return res.render(`auth/forgotPassword/reset-password`, { id: req.body.id, error: 'Invalid input!' });
//   }

//   if (req.body.new_password !== req.body.confirm_password) {
//     return res.render(`auth/forgotPassword/reset-password`, { id: req.body.id, error: "Confirm password does not match!" });
//   }

//   const { id, new_password, confirm_password } = req.body;
//   const user = await authService.getUserById(id);
//   console.log("user: ", user);

//   if (!user) {
//     return res.render("error");
//   }

//   authService.updatePassword(id, new_password)
//     .then(() => {
//       return res.redirect("/auth/login");
//     })
//     .catch((err) => {
//       console.log("err", err);
//       return res.render("error");
//     });
// };

exports.logout = (req, res) => {
    req.logout(function (err) {
        console.log(req.session);
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
};