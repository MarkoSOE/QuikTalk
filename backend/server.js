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

const corsOptions = require("./config/corsOptions");

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

app.use(cors(corsOptions));

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

//Initializing Socket.Io
const io = require("socket.io")(http, {
	cors: {
		origin: "http://localhost:3000",
	},
});

//socketio
io.on("connection", (socket) => {
	console.log(`Alert: ${socket.id} user just connected!`);

	socket.on("setup", (userData) => {
		socket.join(userData._id);
		console.log(`${userData.firstname} is online`);
		socket.emit("connected");
	});

	socket.on("join chat", (room) => {
		socket.join(room);
		console.log(`User with ID: ${socket.id}joined room: ${room}`);
	});

	socket.on("new message", (newMessageRecieved) => {
		socket.broadcast.emit("message recieved", newMessageRecieved.data);
	});

	socket.on("disconnect", () => {
		console.log("A user disconnected");
		socket.disconnect();
	});
});
