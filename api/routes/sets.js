const router = require("express").Router();

const Set = require("../models/Set");

const {
  verifyToken,
  verifySet,
} = require("../middleware/verifyToken");


// SETS ACTIONS
//
// CREATE SETS
router.post("/", verifyToken, async (req, res) => {
    const {title, desc, classify, shared } = req.body;
    const rating = {
      voteTotal: 0,
      star: 0
    };
    const cards = [];
    try {
      const newSet = new Set({
        title,
        desc,
        classify,
        uploadBy: req.user.username,
        rating,
        shared,
        cards,
        verify: req.user.id
      });
      const savedSet = await newSet.save();
      res.status(201).json(savedSet);
    } catch (err) {
      res.status(500).json(err);
    }
});

// UPDATE SETS
router.put("/update/:id", verifySet, async (req, res) => {
    try {
      const updatedSet = await Set.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedSet);
    } catch (err) {
      res.status(500).json(err);
    }
});

// DELETE SETS
router.delete("/delete/:id", verifySet, async (req, res) => {
    try {
      await Set.findByIdAndDelete(req.params.id);
      res.status(200).json("The collection has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
});

// GET SETS BY ID FOR USER
router.get("/view/:id", verifySet, async (req, res) => {
  try {
    const sets = await Set.findById(req.params.id);
    res.status(200).json(sets);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL SETS FOR USER
router.get("/view", verifyToken, async (req, res) => {
  try {
    const sets = await Set.find({ verify: req.user.id });
    res.status(200).json(sets);
  } catch (err) {
    res.status(500).json(err);
  }
})

// GET SETS BY ID PUBLIC
router.get("/library/:id", verifyToken, async (req, res) => {
  try {
    const sets = await Set.findById(req.params.id);
    res.status(200).json(sets);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL SETS PUBLIC
router.get("/library", verifyToken, async (req, res) => {
  try {
    const sets = await Set.find({ shared: true });
    res.status(200).json(sets);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET SETS BY TAGS

router.get("/tags", verifyToken, async (req, res) => {
  try {
    const tags = req.body.classify;
    let sets = [];
    for (let i in tags){
      const tmp = await Set.find({ classify: tags[i], shared: true});
      sets = sets.concat(tmp);
    }
    res.status(200).json(sets);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ADD TO MY SETS LIST
router.post("/:set_id/addset", verifyToken, async(req, res) =>{
  try {
    const addSet = await Set.findOne({"_id": req.params.set_id});
    const newTitle = addSet.title + " clone by " + req.user.username
    const {desc, classify, uploadBy, shared, cards } = addSet;
    const rating = {
      voteTotal: 0,
      star: 0
    };
    const newSet = new Set({
      title: newTitle,
      desc,
      classify,
      uploadBy,
      rating,
      shared,
      cards,
      verify: req.user.id
    });
    const savedSet = await newSet.save();
    res.status(201).json(savedSet);
  } catch (err) {
    res.status(500).json(err);
  }
});

// EXT ACTION
//
// VOTE STAR
router.put("/:set_id/vote", verifyToken, async(req, res) => {
  try {
    const setVote = await Set.findOne({"_id": req.params.set_id});
    const newVoteTotal = setVote.rating.voteTotal + 1;
    const newStar = Math.round((setVote.rating.star * setVote.rating.voteTotal + req.body.star)/newVoteTotal);
    console.log(newVoteTotal);
    console.log(newStar);
    const newRating = await Set.findByIdAndUpdate(
      {"_id": req.params.set_id},
      {
        $set: {
          "rating.voteTotal": newVoteTotal,
          "rating.star": newStar
        }
      },
      { new: true}
    );
    res.status(200).json(newRating);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CARD ACTION
//
// ADD CARD
router.post("/:set_id/addcard", verifySet, async (req, res) => {
  try {
    const addCard = await Set.findByIdAndUpdate(
      req.params.set_id,
      {
        $push: {
          "cards": req.body,
        }
      },
      { new: true }
    );
    res.status(200).json(addCard);
  } catch (err) {
    res.status(500).json(err);
  }
});

// EDIT CARD
router.put("/:set_id/editcard/:id", verifySet, async (req, res) => {
  const MySet = await Set.findOne({ _id: req.params.set_id });
    if (MySet !== null) {
      try {
        const newEditCard = await Set.findOneAndUpdate(
          {"_id": req.params.set_id, "cards._id": req.params.id},
          {
            $set: {
              "cards.$.title": req.body.title,
              "cards.$.question": req.body.question,
              "cards.$.img": req.body.img,
              "cards.$.level": req.body.level
            }
          },
          { new: true}
        );
        res.status(200).json(newEditCard);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      return res.status(403).json("Set_id is not correct")
    }
});

// DELETE CARD
router.delete("/:set_id/deletecard/:id", verifySet, async (req, res) => {
    try {
      // const MySet = await Set.findOne({ _id: req.params.set_id });
      await Set.findOneAndUpdate(
        {"_id": req.params.set_id},
        {
          $pull: {
            "cards": {
              _id: req.params.id
            }
          }
        }
        );
      res.status(200).json("The collection has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
});

// GET CARDS TO LEARN
router.get("/:set_id/learn", verifyToken, async (req, res) => {
  try {
    const sets = await Set.findOne({ "_id": req.params.set_id });
    res.status(200).json(sets.cards)
  } catch (err) {
    res.status(500).json(err)
  }
});

// GET CARDS TO REVIEW
router.get("/review", verifyToken, async (req, res) => {
  try {
    const sets = await Set.find({ verify: req.user.id});
    let cardsReview = [];
    for (let i in sets) {
      cardsReview = cardsReview.concat(sets[i].cards)
    }
    res.status(200).json(cardsReview);
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
