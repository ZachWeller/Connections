const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  words: Array,
  reason: String,
});

module.exports = mongoose.model("words", groupSchema);
