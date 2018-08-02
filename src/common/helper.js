"use strict";

const helper = module.exports;

/**
 * Format the output data for responding
 * @param data The object/array of data to return within the data property
 * @param message The message return together with response
 * @param additionalProperties Other properties included in the response
 * @returns {{}}
 */
helper.formatOutputData = function(data, message, additionalProperties = {}) {
    const result = {};
    result.data = typeof data === "object" ? data : null;
    result.success = true;
    result.message = message ? message : "common.success";
    Object.assign(result, additionalProperties);
    return result;
};

/**
 * Display the error message to the client. If the error is validation error display exact error, otherwise display unknown error
 * @param err
 * @returns {{success: boolean, message: string}}
 */
helper.displayErrorMessage = function(err) {
    const myErrMsg = [],
        translateVariablePattern = /\w+\.\w+/g;
    console.log(err);
    if (Array.isArray(err.errors)) {
        err.errors.forEach(error => {
            if (error instanceof models.Sequelize.ValidationErrorItem) {
                if (error.message.indexOf(".") !== -1) {
                    myErrMsg.push("{{" + error.message + "}}");
                } else {
                    myErrMsg.push(helper.ucFirst(error.message));
                }
            } else {
                myErrMsg.push(helper.ucFirst(error.message));
            }
        });
    } else {
        if (err instanceof models.Sequelize.ValidationErrorItem) {
            if (translateVariablePattern.test(err.message)) {
                myErrMsg.push("{{" + err.message + "}}");
            } else {
                myErrMsg.push(helper.ucFirst(err.message));
            }
        } else {
            myErrMsg.push(err);
        }
    }
    const myMessage = myErrMsg.map(m => {
        return "<li>" + m + "</li>";
    });
    return {
        success: false,
        message: "<ul>" + myMessage.join("") + "</ul>"
    };
};

/**
 * Validate a json string
 * @param str
 * @returns {boolean}
 */
helper.isValidJson = function(str) {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
};

/**
 * Turn the string to camel case
 * @param str
 * @returns {string}
 */
helper.camelize = function(str) {
    return str.trim().replace(/[-_\s]+(.)?/g, (match, c) => c.toUpperCase());
};
