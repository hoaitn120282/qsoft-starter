/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
    res.send({ message: "Welcome to QSoft Starter" });
};
