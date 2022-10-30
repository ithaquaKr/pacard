const router = require("express").Router();
const Card = require("../models/Card");
const {
    verifyToken,
    verifyCard
  } = require("./verifyToken");


//CREATE
router.post("/", verifyToken, async (req, res) => {
    const {title, question, img, collect } = req.body;
    try {
      const newCard = new Card({
        title,
        question,
        img,
        collect,
        uploadby: req.user.username,
        verify: req.user.id
      });
      const savedCard = await newCard.save();
      res.status(201).json(savedCard);
    } catch (err) {
      res.status(500).json(err);
    }
});

//UPDATE
router.put("/:id", verifyCard, async (req, res) => {
    try {
      const updatedCard = await Card.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedCard);
    } catch (err) {
      res.status(500).json(err);
    }
});

//DELETE

router.delete("/:id", verifyCard, async (req, res) => {
    try {
      await Card.findByIdAndDelete(req.params.id);
      res.status(200).json("The document has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
});

//GET
//
// router.get("/find/:id", verifyToken, async (req, res) => {
//   try {
//     const card = await Card.findById(req.params.id);
//     res.status(200).json(card);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //GET ALL for user
// router.get("/cards", verifyToken, async (req, res) => {
//     try {
//       const cards = await Card.find({verify: req.user.id});
//       res.status(200).json(cards.reverse());
//     } catch (err) {
//       res.status(500).json(err);
//     }
// });

//GET ALL for user
router.get("/collection/:id", verifyToken, async (req, res) => {
  try {
    const cards = await Card.find({ collect: req.params.id });
    res.status(200).json(cards);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
