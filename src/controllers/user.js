const { promisify } = require("util");
const userRepository = require(process.cwd() +
    "/src/database/repositories/user");
const Logger = require(process.cwd() + "/src/common/Logger");
/**
 * GET /account
 * Login page.
 */
exports.getAccount = (req, res) => {
    const userModel = new userRepository(req, res);
    userModel
        .paginate()
        .then(data => {
            return res.send(data);
        })
        .catch(err => {
            Logger.err("Unable to query data:", err);
        });
};

exports.postAccount = (req, res) => {
    const userModel = new userRepository(req, res);
    userModel
        .create(req)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            Logger.err("Unable to create new row:", err);
        });
};
