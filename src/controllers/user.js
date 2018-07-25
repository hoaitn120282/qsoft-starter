const { promisify } = require("util");
const User = require(process.cwd() + "/src/models/User");

/**
 * GET /account
 * Login page.
 */
exports.getAccount = (req, res) => {
    res.send({account:"demo api"});
};