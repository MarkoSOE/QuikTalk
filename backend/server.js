const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const cors = require('cors')
const MongoStore = require("connect-mongo")(session);
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
// const messageRoutes = require("./routes/messages");

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
// require("./config/passport")(passport);

app.use(cors())


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
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
// app.use("/message", messageRoutes);

//Server Running
app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running, you better catch it!");
});
