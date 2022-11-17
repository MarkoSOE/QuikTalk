const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");
const mongoose = require("mongoose");

// exports.getLogin = (req, res) => {
//   if (req.user) {
//     return res.redirect("/profile");
//   }
//   res.render("login", {
//     title: "Login",
//   });
// };

//get a single user that matches the ID being passed in
exports.getSingularUser = async (req, res) => {
	try {
		const keyword = req.query.firstName
			? {
					$or: [
						{ firstname: { $regex: req.query.firstName, $options: "i" } },
						{ lastname: { $regex: req.query.firstName, $options: "i" } },
					],
			  }
			: {};

		const users = await User.find(keyword).find({
			_id: { $ne: req.user._id },
		});
		res.send(users);
		console.log(users);

		// // const user = await User.find({firstname: req.query.firstName.toLowerCase()}).lean()
		// const user = await User.fuzzySearch({firstname: req.query.firstName.toLowerCase()})
		// console.log(user)
		// res.send(user)
	} catch (error) {
		console.log(error);
	}
};

exports.logout = (req, res) => {
	req.logout(() => {
		console.log("Use has logged out");
	});
	req.session.destroy((err) => {
		if (err) {
			console.log("Error: Failed to destroy the session during logout", err);
		}
		req.user = null;
		res.redirect("/");
	});
};

exports.getUsers = async (req, res) => {
	console.log("getting all users");
	try {
		const users = await User.find().sort({ createdAt: -1 }).lean();
		res.send(users);
	} catch (error) {
		console.log(error);
	}
};

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
			return res.status(200).json("success");
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
		const validationErrors = [];

		const foundUser = await User.findOne({ email: email });

		if (foundUser) {
			validationErrors.push({ msg: "User with this email already exists" });
		}
		if (password !== confirmpassword) {
			validationErrors.push({ msg: "Passwords do not match" });
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
			password,
		});

		if (user) {
			res.status(201).json({
				_id: user._id,
				firstName: user.firstname,
				lastName: user.lastname,
				email: user.email,
			});
		} else {
			return res.status(400).json("Error adding user");
		}
	} catch (err) {
		console.error(err);
	}
};
