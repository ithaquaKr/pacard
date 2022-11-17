const User = require("../models/User");
const Set = require("../models/Set");

const {
  verifyToken,
  verifySet,
  verifyTokenAndAuthorization,
} = require("../middleware/verifyToken");

const router = require("express").Router();
const CryptoJS = require("crypto-js");

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET RESULT
router.get("/result/:id", verifyToken, async (req, res) => {
  try {
    const sets = await Set.find({ verify: req.params.id });

    let cardTotal = 0;
    let reviewTotal = 0;
    let noReviewTotal = 0;

    for (let i in sets){
      for (let j in sets[i].cards){
        cardTotal++;
        if (sets[i].cards[j].level === 3){
          noReviewTotal++;
        }
        if(sets[i].cards[j].level !== 0 && sets[i].cards[j].level !== 3) {
          reviewTotal++;
        }
      }
    }

    const result = {
      "cardTotal": cardTotal,
      "reviewTotal": reviewTotal,
      "noReviewTotal": noReviewTotal,
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
