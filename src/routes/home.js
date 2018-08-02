const express = require("express");
const router = express.Router();
/**
 * Import home controller.
 */
const homeController = require(process.cwd() + "/src/controllers/home");
/**
 * Call index action.
 */
router.get("/", homeController.index);

module.exports = router;
