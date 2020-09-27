// Bring in modules.
const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Database connection.
connectDB();

app.get("/", (req, res) => res.json({ msg: "Welcome to the Contact Keeper API!" }));

// Define routes.
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

// Server port for the backend.
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));