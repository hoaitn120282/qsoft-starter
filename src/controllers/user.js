const { promisify } = require("util");
const models = require(process.cwd() + "/src/database/Initialize");


/**
 * GET /account
 * Login page.
 */
exports.getAccount = (req, res) => {
    const user = models.User.findAll()
        .then(data => {
            res.send({ account: data });
        })
        .catch(err => {});
};
