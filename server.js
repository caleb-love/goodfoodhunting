const express = require("express");
const app = express();
const port = process.env.SESSION_SECTRET || 8080;
const session = require("express-session");
const setCurrentUser = require("./middlewares/set_current_User");

const logger = require("./middlewares/logger");
const methodOverride = require("method-override");
const dishController = require("./controllers/dish_controller");
const sessionController = require("./controllers/session_controller");

app.set("view engine", "ejs");

app.use(logger);

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride());


app.use(
  session({
    secret: "process.env.SESSION_SECTRET || keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/", dishController);
app.use("/", sessionController);
app.use(setCurrentUser);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
