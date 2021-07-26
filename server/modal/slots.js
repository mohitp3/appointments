const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  slot: {
    type: Number,
    min: 1,
    max: 14,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value",
    },
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const slots = mongoose.model("slots", schema);

module.exports = slots;
