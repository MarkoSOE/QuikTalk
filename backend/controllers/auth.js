const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");

// exports.getLogin = (req, res) => {
//   if (req.user) {
//     return res.redirect("/profile");
//   }
//   res.render("login", {
//     title: "Login",
//   });
// };

exports.postLogin = (req, res, next) => {
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  //authenticate with passport

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json(info);
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json('success')  
    });
  })(req, res, next);
};

// exports.logout = (req, res) => {
//   req.logout(() => {
//     console.log('User has logged out.')
//   })
//   req.session.destroy((err) => {
//     if (err)
//       console.log("Error : Failed to destroy the session during logout.", err);
//     req.user = null;
//     res.redirect("/");
//   });
// };

// exports.getSignup = (req, res) => {
//   if (req.user) {
//     return res.redirect("/profile");
//   }
//   res.render("signup", {
//     title: "Create Account",
//   });
// };

exports.postSignup = async (req, res, next) => {
  try {
    let { firstname, lastname, email, password, confirmpassword } = req.body;
    const validationErrors = []

    const foundUser = await User.findOne({ email: email });
    
    if(foundUser){
      validationErrors.push({msg: 'User with this email already exists'})
    }
    if(password !== confirmpassword){
      validationErrors.push({msg: "Passwords do not match"})
    }
    if (validationErrors.length) {
      return res.status(502).json(validationErrors);
    }

    email = validator.normalizeEmail(email, {
      gmail_remove_dots: false,
    });
    

    const user = await User.create({
      firstname,
      lastname,
      email,
      password
    });

    if(user){
      res.status(201).json({
        _id: user._id,
        firstName: user.firstname,
        lastName: user.lastname,
        email: user.email
      })
    } else {
      return res.status(400).json('Error adding user')
    }

  } catch (err) {
   console.error(err) 
  }
  // try {
  //   const validationErrors = [];
  //   if (!validator.isEmail(req.body.email))
  //     validationErrors.push({ msg: "Please enter a valid email address." });
  //   if (!validator.isLength(req.body.password, { min: 8 }))
  //     validationErrors.push({
  //       msg: "Password must be at least 8 characters long",
  //     });
  //   if (req.body.password !== req.body.confirmPassword)
  //     validationErrors.push({ msg: "Passwords do not match" });
  
  //   if (validationErrors.length) {
  //     req.flash("errors", validationErrors);
  //     return res.status(400);
  //   }
  //   req.body.email = validator.normalizeEmail(req.body.email, {
  //     gmail_remove_dots: false,
  //   });
  
  //   const user = new User({
  //     userName: req.body.userName,
  //     email: req.body.email,
  //     password: req.body.password,
  //   });
  
  //   User.findOne(
  //     { $or: [{ email: req.body.email }, { userName: req.body.userName }] },
  //     (err, existingUser) => {
  //       if (err) {
  //         return next(err);
  //       }
  //       if (existingUser) {
  //         req.flash("errors", {
  //           msg: "Account with that email address or username already exists.",
  //         });
  //         return res.status(300).send("Account with that email address or username already exists.");
  //       }
  //       user.save((err) => {
  //         if (err) {
  //           return next(err);
  //         }
  //         req.logIn(user, (err) => {
  //           if (err) {
  //             return next(err);
  //           }
  //         });
  //       });
  //     }
  //   );
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).send("Server Error");
  // }
};
