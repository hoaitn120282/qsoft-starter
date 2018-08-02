const { promisify } = require("util");
const userRepository = require(process.cwd() +
    "/src/database/repositories/user");
const Logger = require(process.cwd() + "/src/common/Logger");
const helper = require(process.cwd() + "/src/common/helper");
/**
 * GET /account
 * Login page.
 */
exports.getAccount = (req, res) => {
    const userModel = new userRepository(req, res);
    userModel
        .paginate({
            litmit: 10,
            offset: 1
        })
        .then(data => {
            return res.send(helper.formatOutputData(data, "Query Successful!"));
        })
        .catch(err => {
            Logger.err(
                "Unable to query data:",
                helper.displayErrorMessage(err)
            );
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
