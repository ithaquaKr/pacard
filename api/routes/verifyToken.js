const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Card = require("../models/Card");
const Collection = require("../models/Collection")
const Namespace = require("../models/Namespace")

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err){
        return res.status(403).json("Token is not valid!");
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, async () => {
    let FindUser = await User.findOne({ _id: req.user.id });
    if (FindUser !== null) {
      next();
    } else {
      return res.status(403).json("You are not allowed to do that!");
    }
  });
};

const verifyCard = (req, res, next) => {
  verifyToken(req, res, async () => {
    let FindUser = await User.findOne({ _id: req.user.id });

    // Check user
    if (FindUser !== null) {
      const cards = await Card.findOne({ verify: req.user.id, _id: req.params.id });

      // Check Document with user id
      if (cards === null) {
        return res.status(403).json("You are not Author/Admin to do that!");
      } else {
        next();
      }
    } else {
      return res.status(403).json("You are not allowed to do that!");
    }
  });
};

const verifyCollection = (req, res, next) => {
  verifyToken(req, res, async () => {
    let FindUser = await User.findOne({ _id: req.user.id });

    //Check User
    if (FindUser !== null) {
      const collections = await Collection.findOne({ verify: req.user.id, _id: req.params.id });

      //Check Collection with user id
      if (collections === null) {
        return res.status(403).json("You are not Author/Admin to do that");
      } else {
        next();
      }
    } else {
      return res.status(403).json("You are not allowed to do that")
    }
  })
};

const verifyNamespace = (req, res, next) => {
  verifyToken(req, res, async () => {
    let FindUser = await User.findOne({ _id: req.user.id });

    //Check User
    if (FindUser !== null) {
      const namespaces = await Namespace.findOne({ verify: req.user.id, _id: req.params.id });

      //Check Collection with user id
      if (namespaces === null) {
        return res.status(403).json("You are not Author/Admin to do that");
      } else {
        next();
      }
    } else {
      return res.status(403).json("You are not allowed to do that")
    }
  })
};


module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyCard,
  verifyCollection,
  verifyNamespace
};
