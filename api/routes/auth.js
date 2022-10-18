const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
    avatar: req.body.avatar
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN

router.post("/login", async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (user === null) {
      res.status(401).json("Wrong credentials!")
    } else {
      const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.PASS_SEC
      );
      const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
  
      if(OriginalPassword !== req.body.password ){
        res.status(401).json("Wrong credentials!");
      } else {
        const accessToken = jwt.sign(
          {
            id: user._id,
            // isAdmin: user.isAdmin,
            username: user.username
          },
          process.env.JWT_SEC,
          {expiresIn:"12h"}
        );
        const { password, ...others } = user._doc;
        res.status(200).json({...others, accessToken});
      }
    }
});

module.exports = router;
