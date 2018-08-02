/**
 * Module dependencies.
 */
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const chalk = require("chalk");
const errorHandler = require("errorhandler");
const dotenv = require("dotenv");
const fs = require("fs");
const Logger = require(process.cwd() + "/src/common/Logger");
const compression = require("compression");
const cors = require("cors-express");
const corsOptions = require(__dirname + "/config/cors.json");
corsOptions.options = function(req, res, next) {
    if (req.method === "OPTIONS") {
        res.setHeader("Access-Control-Allow-Credentials", true);
        res.status(200).end();
    } else {
        next();
    }
};

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: ".env" });
/**
 * Import models
 */
const models = require(process.cwd() + "/src/database/Initialize");
models.sequelize
    .authenticate()
    .then(() => {
        console.log("%s Database connect successful!", chalk.green("✓"));
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
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(cors(corsOptions));
/**
 * Import all routes.
 */
const routePath = process.cwd() + "/src/routes";
let routeName = {};
let controllerName = {};
if (fs.existsSync(routePath)) {
    fs.readdirSync(routePath)
        .filter(file => {
            return file.endsWith(".js");
        })
        .forEach(file => {
            controllerName = file;
            const routes = require(routePath + "/" + controllerName);
            routeName = controllerName.split(".");
            app.use("/" + routeName[0], routes);
        });
}
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
});

module.exports = app;
