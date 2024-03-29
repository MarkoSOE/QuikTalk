const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
	{
		firstname: {
			type: String,
			required: true,
		},
		lastname: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		userStatus: {
			type: String,
			default: "offline",
		},
		avatar: {
			type: String,
			default: "",
		},
		lastOnline: Date,
	},
	{ timestamps: true }
);

//Password hash middleware.

UserSchema.pre("save", function save(next) {
	const user = this;
	if (!user.isModified("password")) {
		return next();
	}
	bcrypt.genSalt(10, (err, salt) => {
		if (err) {
			return next(err);
		}
		bcrypt.hash(user.password, salt, (err, hash) => {
			if (err) {
				return next(err);
			}
			user.password = hash;
			next();
		});
	});
});

//Helper method for validating user's password

UserSchema.methods.comparePassword = function comparePassword(
	candidatePassword,
	cb
) {
	bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
		cb(err, isMatch);
	});
};

module.exports = mongoose.model("User", UserSchema);
