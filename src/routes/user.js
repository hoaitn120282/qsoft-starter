const express = require("express");
const router = express.Router();
/**
 * Import home controller.
 */
const userController = require(process.cwd() + "/src/controllers/user");
/**
 * Call view account action.
 */
router.get("/account", userController.getAccount);

module.exports = router;
