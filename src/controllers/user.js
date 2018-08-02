const { promisify } = require("util");
const models = require(process.cwd() + "/src/database/Initialize");

/**
 * GET /account
 * Login page.
 */
exports.getAccount = (req, res) => {
    models.Users.findAll({})
        .then(data => {
            res.send({ account: data });
        })
        .catch(err => {});
};
