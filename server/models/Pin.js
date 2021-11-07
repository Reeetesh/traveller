const mongoose = require("mongoose");

const PinSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    min: 3,
  },
  title: {
    type: String,
    require: true,
    min: 3,
  },
  desc: {
    type: String,
    require: true,
    min: 3,
  },

  rating: {
    type: Number,
    require: true,
    min: 1,
    max: 5,
  },
  latitude: {
    type: Number,
    require: true,
  },
  longitude: {
    type: Number,
    require: true,
  },
});

module.exports = mongoose.model("Pin", PinSchema);
