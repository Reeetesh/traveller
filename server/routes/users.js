const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//register
router.post("/register", async (req, res) => {
  try {
    //generate password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    //create user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
    });
    //save user
    const user = await newUser.save();
    res.status(200).json(user._id);
  } catch (err) {
    res.status(500).json(err);
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    //find user
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(404).json("User not found!");
    //validate password
    const validpassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validpassword && res.status(400).json("Invalid password!");
    //send response
    res.status(200).json({
      _id: user._id,
      username: user.username,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
