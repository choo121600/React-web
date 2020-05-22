const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const config = require("./config/key");
const { User } = require("./models/user");

// Connect MongoDB
mongoose
  .connect(config.mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("db connect");
  })
  .catch((err) => console.error(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.post("/api/users/register", (req, res) => {
  const user = new User(req.body);
  // Save User Data
  user.save((err, userdata) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      data: userdata,
    });
  });
});
app.listen(5000);
