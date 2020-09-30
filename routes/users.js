// Register route.
const express = require("express");
const router = express.Router();

// Brings in the User model, so that it can be used in the routes.
const User = require("../models/User");

// POST route with "api/users" endpoint that registers a user. Public access.
router.post("/", (req, res) => {
    res.send("Register a user.");
});

module.exports = router;