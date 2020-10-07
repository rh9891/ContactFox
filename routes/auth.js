const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

// Brings in the User model, so that it can be used in the routes.
const User = require("../models/User");

// Login and authentication. Validates the logged in user.
const express = require("express");
const router = express.Router();

// GET route with "api/auth" endpoint that gets the logged in user. Private access.
router.get("/", auth, async (req, res) => {
  // Passed in auth as a second parameter in order to make it a protected route.
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error.");
  }
});

// POST route with "api/auth" endpoint that authorizes the user and gets the token. Public access.
router.post(
  "/",
  [
    check("email", "Please enter a valid email address.").isEmail(),
    check("password", "Password is required.").exists(),
  ],
  async (req, res) => {
    // Errors object that is sent through the backend and sends the user a 400 error if the requirements for the user model are not met.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: "Invalid credentials." });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid credentials." });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 3600,
        },
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
