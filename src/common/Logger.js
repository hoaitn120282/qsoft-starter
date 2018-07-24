const logger = require("winston");

const config = require(process.cwd() + "/config/config.json");
class Logger {
  info(...data) {
    if (config.debug) logger.info(...data);
  }

  debug(...data) {
    logger.debug(...data);
  }

  error(...data) {
    logger.error(...data);
  }
}

module.exports = new Logger();
