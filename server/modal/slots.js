const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  slot: {
    type: Date,
    default: Date.now,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const slots = mongoose.model("slots", schema);

module.exports = slots;
