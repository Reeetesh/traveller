const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const pinRoutes = require("./routes/pins");
const userRoutes = require("./routes/users");

dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

app.use("/api/pins", pinRoutes);
app.use("/api/users", userRoutes);

app.listen(5000, () => {
  console.log("Server started at port 5000");
});
