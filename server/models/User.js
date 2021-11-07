const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
    min: 2,
    max: 20,
  },
  email: {
    type: String,
    require: true,
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    min: 8,
  },
  timestamp: {
    type: Date,
  },
});

module.exports = mongoose.model("User", UserSchema);
