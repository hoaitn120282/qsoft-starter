const https = require("https");
const app = require("./app");
const models = require(process.cwd() + "/src/models/index");
const debug = require("debug")("express-sequelize");
const fs = require("fs");
const Logger = require(process.cwd() + "/src/common/Logger");

const port = parseInt(process.env.PORT, 10) || 8000;
const options = {
  key: fs.readFileSync("fixtures/keys/key.pem"),
  cert: fs.readFileSync("fixtures/keys/cert.pem")
};

const server = https.createServer(options, app);
server.listen(port, function() {
  debug("Express server listening on port " + server.address().port);
});
server.on("error", onError);
server.on("listening", onListening);

models.sequelize
  .authenticate()
  .then(() => {
    models.sequelize.sync().then(function() {});
  })
  .catch(err => {
    Logger.error("Unable to connect to the database:", err);
  });

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
