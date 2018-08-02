"use strict";

const baseReposiroty = require(process.cwd() +
    "/src/database/repositories/baseRepository");
const models = require(process.cwd() + "/src/database/Initialize");
class userRepository extends baseReposiroty {
    get model() {
        return models.User;
    }
}

module.exports = userRepository;
