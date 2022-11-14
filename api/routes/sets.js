const router = require("express").Router();

const Set = require("../models/Set");

const {
  verifyToken,
  verifySet, verifyNamespace
} = require("./verifyToken");
const Namespace = require("../models/Namespace");


//CREATE
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

//UPDATE
router.put("/:id", verifySet, async (req, res) => {
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

//DELETE
router.delete("/:id", verifySet, async (req, res) => {
    try {
      await Set.findByIdAndDelete(req.params.id);
      res.status(200).json("The collection has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
});

//CARD ACTION

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
        console.log(newEditCard)
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

// GET CARDS



//GET COLLECTION BY ID FOR USER
// router.get("/find/:id", verifySet, async (req, res) => {
//   try {
//     const collections = await Collection.findById(req.params.id);
//     res.status(200).json(collections);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
//
// //GET ALL COLLECTION FOR USER
// router.get("/mycollections", verifyToken, async (req, res) => {
//   try {
//     const collections = await Collection.find({ verify: req.user.id });
//     res.status(200).json(collections);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
//
// //GET COLLECTION PUBLIC
// router.get("/", verifyToken, async (req, res) => {
//   try {
//     const collections = await Collection.find({ shared: true });
//     res.status(200).json(collections);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
