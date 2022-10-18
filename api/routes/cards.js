const router = require("express").Router();
const Card = require("../models/Card");
const {
    verifyToken,
    verifyAuthor
  } = require("./verifyToken");
  

//CREATE

router.post("/", verifyToken, async (req, res) => {
    const {title, desc, question, classify } = req.body;
    try {
      const newCard = new Card({
        title,
        desc,
        question,
        classify,
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

router.put("/:id", verifyAuthor, async (req, res) => {
    try {
      const updatedDocument = await Document.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedDocument);
    } catch (err) {
      res.status(500).json(err);
    }
});

//DELETE

router.delete("/:id", verifyAuthor, async (req, res) => {
    try {
      await Document.findByIdAndDelete(req.params.id);
      res.status(200).json("The document has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
});

//GET

router.get("/find/:id", verifyToken, async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    res.status(200).json(document);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL for user
router.get("/mydocuments", verifyToken, async (req, res) => {
    try {
      const documents = await Document.find({verify: req.user.id});
      res.status(200).json(documents.reverse());
    } catch (err) {
      res.status(500).json(err);
    }
});

//GET ALL for user
router.get("/", verifyToken, async (req, res) => {
  try {
    const documents = await Document.find();
    res.status(200).json(documents.reverse());
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
