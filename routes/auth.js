// Login and authentication. Route to check the logged in user.
const express = require("express");
const router = express.Router();

// GET route with "api/auth" endpoint that gets the logged in user. Private access.
router.get("/", (req, res) => {
    res.send("Get logged in user.");
});

// POST route with "api/auth" endpoint that authorizes the user and gets the token. Public access.
router.post("/", (req, res) => {
    res.send("Log in user.");
});

module.exports = router;