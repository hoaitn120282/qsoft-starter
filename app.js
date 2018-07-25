/**
 * Module dependencies.
 */
const express = require("express");
const compression = require("compression");
const session = require("express-session");
const bodyParser = require("body-parser");
const logger = require("morgan");
const chalk = require("chalk");
const errorHandler = require("errorhandler");
const lusca = require("lusca");
const dotenv = require("dotenv");
const flash = require("express-flash");
const path = require("path");
const passport = require("passport");
const expressValidator = require("express-validator");
const expressStatusMonitor = require("express-status-monitor");
const sass = require("node-sass-middleware");
const multer = require("multer");
const Logger = require(process.cwd() + "/src/common/Logger");
const upload = multer({ dest: path.join(__dirname, "uploads") });

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: ".env" });

/**
 * Import controllers.
 */
const homeController = require(process.cwd() + "/src/controllers/home");
const userController = require(process.cwd() + "/src/controllers/user");
/**
 * Import models
 */
const models = require(process.cwd() + "/src/models/index");
models.sequelize
    .authenticate()
    .then(() => {
        // models.sequelize.sync().then(function() {});
    })
    .catch(err => {
        Logger.error("Unable to connect to the database:", err);
    });
/**
 * Create Express server.
 */
const app = express();

/**
 * Express configuration.
 */
app.set("host", process.env.NODE_HOST || "0.0.0.0");
app.set("port", process.env.NODE_PORT || 8080);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(expressStatusMonitor());
app.use(compression());
app.use(
    sass({
        src: path.join(__dirname, "public"),
        dest: path.join(__dirname, "public")
    })
);
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(
    session({
        resave: true,
        saveUninitialized: true,
        secret: process.env.SESSION_SECRET,
        cookie: { maxAge: 1209600000 } // two weeks in milliseconds
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
app.disable("x-powered-by");
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

/**
 * Demo call route.
 */
app.get("/", homeController.index);
app.get("/account", userController.getAccount);
/**
 * Error Handler.
 */
if (process.env.NODE_ENV === "development") {
    // only use in development
    app.use(errorHandler());
}

/**
 * Start Express server.
 */
app.listen(app.get("port"), () => {
    console.log(
        "%s Your app is running at http://localhost:%d in %s mode",
        chalk.green("✓"),
        app.get("port"),
        app.get("env")
    );
    console.log("  Press CTRL-C to stop\n");
});

module.exports = app;
