// Register route.
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

// Brings in the User model, so that it can be used in the routes.
const User = require("../models/User");

// POST route with "api/users" endpoint that registers a user. Public access.
router.post("/", [
    // Express validators that check the required name, valid email address, and the length of the user's password.
    check("name", "Please enter a name.").not().isEmpty(),
    check("email", "Please enter a valid email address.").isEmail(),
    check("password", "Please enter a password with 8 or more characters.").isLength({ min: 8 })
], (req, res) => {
    // Errors object that is sent through the backend and sends the user a 400 error if the requirements for the user model are not met.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Approval message if the requirements are met. 
    res.send("Approved.")
});

module.exports = router;