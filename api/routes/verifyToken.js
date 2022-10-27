const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Card = require("../models/Card");


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
    FindUser = await User.findOne({ _id: req.user.id });
    if (FindUser !== null) {
      next();
    } else {
      return res.status(403).json("You are not alowed to do that!");
    }
  });
};

// const verifyTokenAndAdmin = (req, res, next) => {
//   verifyToken(req, res, () => {
//     if (req.user.isAdmin) {
//       next();
//     } else {
//       return res.status(403).json("You are not admin to do that!");
//     }
//   });
// };

const verifyAuthor = (req, res, next) => {
  verifyToken(req, res, async () => {
    FindUser = await User.findOne({ _id: req.user.id });

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
      return res.status(403).json("You are not alowed to do that!");
    }
  });
};

// const verifyTodoAuthor = (req, res, next) => {
//   verifyToken(req, res, async () => {
//     FindUser = await User.findOne({ _id: req.user.id });
//
//     // Check user
//     if (FindUser !== null) {
//       const todos = await Todo.findOne({ verify: req.user.id, _id: req.params.id });
//
//       // Check Document with user id
//       if (todos === null) {
//         return res.status(403).json("You are not Author/Admin to do that!");
//       } else {
//         next();
//       }
//     } else {
//       return res.status(403).json("You are not alowed to do that!");
//     }
//   });
// };


module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyAuthor
};
