const { promisify } = require("util");
const User = require(process.cwd() + "/src/database/models/user");

/**
 * GET /account
 * Login page.
 */
exports.getAccount = (req, res) => {
    res.send({ account: User.findAll() });
};
