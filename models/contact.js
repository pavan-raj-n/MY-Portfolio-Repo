const mongoose = require("mongoose");

// Create structure of saved data
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

// Export model
module.exports = mongoose.model("Contact", contactSchema);