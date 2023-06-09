const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const session = require("express-session");
const MemoryStore = require("memorystore")(session);

const setCurrentUser = require("./middlewares/set_current_User");
const viewHelpers = require("./middlewares/view_helpers");
const logger = require("./middlewares/logger");
const methodOverride = require("./middlewares/method_override");

const dishController = require("./controllers/dish_controller");
const sessionController = require("./controllers/session_controller");
const userController = require("./controllers/user_controller");

const expressLayouts = require("express-ejs-layouts");

app.set("view engine", "ejs");

app.use(
  session({
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    }),
    resave: false,
    secret: "keyboard cat",
  })
);

app.use(logger);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride);
app.use(expressLayouts);
app.use(
  session({
    secret: process.env.SESSION_SECTRET || "mistyrose",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(setCurrentUser);
app.use(viewHelpers);

app.use(dishController);
app.use(sessionController);
app.use(userController);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
