// CRUD functionality.
const express = require("express");
const router = express.Router();

// GET route with "api/contacts" endpoint to get all of the user's contacts. Private access.
router.get("/", (req, res) => {
    res.send("Get all contacts.");
});

// POST route with "api/contacts" endpoint to add a new contact. Private access.
router.post("/", (req, res) => {
    res.send("Add a contact.");
});

// PUT route with "api/contacts/:id" endpoint to update contact. Private access.
router.put("/:id", (req, res) => {
    res.send("Update contact.");
});

// DELETE route with "api/contacts/:id" endpoint to update contact. Private access.
router.delete("/:id", (req, res) => {
    res.send("Delete contact.");
});

module.exports = router; 