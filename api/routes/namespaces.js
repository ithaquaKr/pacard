const router = require("express").Router();
const Namespace = require("../models/Namespace");
const {
  verifyToken,
  verifyNamespace
} = require("./verifyToken");


//CREATE
router.post("/", verifyToken, async (req, res) => {
    const {name, desc, coll } = req.body;
    try {
      const newNamespace = new Namespace({
        name,
        desc,
        coll,
        verify: req.user.id
      });
      const savedNamespace = await newNamespace.save();
      res.status(201).json(savedNamespace);
    } catch (err) {
      res.status(500).json(err);
    }
});

//UPDATE
router.put("/:id", verifyNamespace, async (req, res) => {
    try {
      const updatedNamespace = await Namespace.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedNamespace);
    } catch (err) {
      res.status(500).json(err);
    }
});

//ADD COLLECTION FOR NAMESPACE
router.put("/addcollection/:id", verifyNamespace, async (req, res) => {
    try {
      const updatedNamespace = await Namespace.findByIdAndUpdate(
        req.params.id,
        {
          $push: {
            "coll": req.body.coll,
          }
        },
        { new: true }
      );
      res.status(200).json(updatedNamespace);
    } catch (err) {
      res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id", verifyNamespace, async (req, res) => {
    try {
      await Namespace.findByIdAndDelete(req.params.id);
      res.status(200).json("The collection has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
});

//GET COLLECTION BY ID FOR USER
router.get("/find/:id", verifyNamespace, async (req, res) => {
  try {
    const namespaces = await Namespace.findById(req.params.id);
    res.status(200).json(namespaces);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL COLLECTION FOR USER
router.get("/mynamespaces", verifyToken, async (req, res) => {
  try {
    const namespaces = await Namespace.find({ verify: req.user.id });
    res.status(200).json(namespaces);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET COLLECTION PUBLIC
// router.get("/", verifyToken, async (req, res) => {
//   try {
//     const namespaces = await Namespace.find();
//     res.status(200).json(namespaces);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
