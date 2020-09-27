// Register route.
const express = require("express");
const router = express.Router();

// POST route with "api/users" endpoint that registers a user. Public access.
router.post("/", (req, res) => {
    res.send("Register a user.");
});

module.exports = router;