// Bring in modules.
const express = require("express");

const app = express();

app.get("/", (req, res) => res.json({ msg: "Welcome to the Contact Keeper API!" }));

// Server port for the backend.
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));