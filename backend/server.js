const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const MongoStore = require("connect-mongo")(session);
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const messageRoutes = require("./routes/messages");
const conversationRoutes = require("./routes/conversation");
const http = require("http").Server(app);
const PORT = process.env.PORT || 3001;

const io = require("socket.io")(http, {
	cors: {
		origin: "http://localhost:3001",
		credentials: true,
	},
});

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

app.use(
	cors({
		origin: "http://locahost:3000",
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		credentials: true,
	})
);

//Middleware that parses incoming JSON request and puts the data in req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Connect To Database
connectDB();

//Using EJS for views
app.set("view engine", "EJS");

//Static Folder
app.use(express.static("public"));

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
	session({
		secret: "keyboard cat",
		resave: false,
		saveUninitialized: false,
		store: new MongoStore({ mongooseConnection: mongoose.connection }),
		cookie: { secure: true },
	})
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate("session"));

global.onlineUsers = new Map();

//socketio
io.on("connection", (socket) => {
	global.chatSocket = socket;
	console.log(`Alert: ${socket.id} user just connected!`);
	socket.on("add-user", (userId) => {
		onlineUsers.set(userId, socket.id);
	});
	socket.on("disconnect", () => {
		console.log("A user disconnected");
	});
	socket.on("send-msg", (data) => {
		console.log("sendmsg", data);
		const sendUserSocket = onlineUsers.get(data.chatref);
		if (sendUserSocket) {
			socket.to(sendUserSocket).emit("msg-recieve", data.message);
		}
	});
	socket.on("typing", (data) => socket.broadcast.emit("typingResponse", data));
});

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
app.use("/message", messageRoutes);
app.use("/conversation", conversationRoutes);

//Server Running
http.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}, you better catch it!`);
});
