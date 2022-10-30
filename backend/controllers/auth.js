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

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }).lean();
    res.send(users);
  } catch (error) {
    console.log(error);
  }
}

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
  }};
