const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema({
  // The user is now part of the schema as each user has their own set of contacts.
  user: {
    type: mongoose.Schema.Types.ObjectId,
    // Refers to the users collection.
    ref: "users",
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  type: {
    type: String,
    default: "personal",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("contact", ContactSchema);
