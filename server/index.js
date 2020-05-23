const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const config = require("./config/key");
const { User } = require("./models/user");
const { auth } = require("./middleware/auth");

const port = process.env.PORT || 5000;

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

app.use("/api/user/auth", auth, (req, res) => {
  res.status(200).json({
    id: req._id,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
  });
});

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

app.post("/api/user/login", (req, res) => {
  //find email
  User.findOne({ email: req.body.email }, (err, user) => {
    console.log(user);
    if (!user)
      return res.json({
        loginSuccsess: false,
        message: "Login failed, Please check your email",
      });
    //compare password
    user.comparePassword(req.body.password, (err, isMatched) => {
      if (!isMatched) {
        return res.json({
          loginSuccsess: false,
          message: "Login failed, Please check your password",
        });
      }
    });
    //generateToken
    user.generateToken((err, user) => {
      if (err) return res.status(400).send(err);
      res.cookie("x_auth", user.token).status(200).json({
        loginSuccsess: true,
      });
    });
  });
});

app.get("/api/user/logout", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "" },
    (err, userdata) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  );
});

app.listen(port, () => {
  console.log(`server running port ${port}`);
});
