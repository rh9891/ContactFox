// CRUD functionality.
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

// Brings in the User and Contact models, so that they can be used in the routes.
const User = require("../models/User");
const Contact = require("../models/Contact");

// GET route with "api/contacts" endpoint to get all of the user's contacts. Private access.
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// POST route with "api/contacts" endpoint to add a new contact. Private access.
router.post(
  "/",
  [auth, [check("name", "Name is required.").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });

      const contact = await newContact.save();

      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// PUT route with "api/contacts/:id" endpoint to update contact. Private access.
router.put("/:id", (req, res) => {
  res.send("Update contact.");
});

// DELETE route with "api/contacts/:id" endpoint to update contact. Private access.
router.delete("/:id", (req, res) => {
  res.send("Delete contact.");
});

module.exports = router;
