// Register route.
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

// Brings in the User model, so that it can be used in the routes.
const User = require("../models/User");

// POST route with "api/users" endpoint that registers a user. Public access.
router.post(
  "/",
  [
    // Express validators that check the required name, valid email address, and the length of the user's password.
    check("name", "Please enter a name.").not().isEmpty(),
    check("email", "Please enter a valid email address.").isEmail(),
    check(
      "password",
      "Please enter a password with 8 or more characters."
    ).isLength({ min: 8 }),
  ],
  async (req, res) => {
    // Errors object that is sent through the backend and sends the user a 400 error if the requirements for the user model are not met.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      // Checks to see if there is a user.
      let user = await User.findOne({ email });
      // Returns an error if the user is already registered.
      if (user) {
        return res.status(400).json({
          msg: "User already exists. Please choose another email address.",
        });
      }

      user = new User({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      // Hashes the user's password.
      user.password = await bcrypt.hash(password, salt);
      // Saves the user in the database.
      await user.save();
      // Creates the payload.
      const payload = {
        user: {
          id: user.id,
        },
      };
      // Signs the token.
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 3600,
        },
        // Responds with the token.
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error.");
    }
  }
);

module.exports = router;
