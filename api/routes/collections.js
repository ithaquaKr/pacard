const router = require("express").Router();
const Collection = require("../models/Collection");
const {
  verifyToken,
  verifyCollection
} = require("./verifyToken");


//CREATE
router.post("/", verifyToken, async (req, res) => {
    const {title, desc, classify, shared } = req.body;
    try {
      const newCollection = new Collection({
        title,
        desc,
        classify,
        shared,
        uploadby: req.user.username,
        verify: req.user.id
      });
      const savedCollection = await newCollection.save();
      res.status(201).json(savedCollection);
    } catch (err) {
      res.status(500).json(err);
    }
});

//UPDATE
router.put("/:id", verifyCollection, async (req, res) => {
    try {
      const updatedCollection = await Collection.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedCollection);
    } catch (err) {
      res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id", verifyCollection, async (req, res) => {
    try {
      await Collection.findByIdAndDelete(req.params.id);
      res.status(200).json("The collection has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
});

//GET COLLECTION BY ID FOR USER
router.get("/find/:id", verifyCollection, async (req, res) => {
  try {
    const collections = await Collection.findById(req.params.id);
    res.status(200).json(collections);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL COLLECTION FOR USER
router.get("/mycollections", verifyToken, async (req, res) => {
  try {
    const collections = await Collection.find({ verify: req.user.id });
    res.status(200).json(collections);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET COLLECTION PUBLIC
router.get("/", verifyToken, async (req, res) => {
  try {
    const collections = await Collection.find({ shared: true });
    res.status(200).json(collections);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
