const mongoose = require("mongoose");

// SubDocuments
const CardSchema = new mongoose.Schema(
  {
    front: { type: String, required: true },
    back: { type: String, require: true},
    img: { type: String, require: true },
    level: { type: Number, default: 0},
  },
  {timestamps: true}
);

// SubDocuments
const RatingSchema = new mongoose.Schema(
  {
    voteTotal: { type: Number, required: true, default: 0},
    star: { type: Number, required: true, default: 0 },
  },
)


// Set
const SetSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, require: true },
    classify: { type: [String], require: true },
    uploadBy: { type: String },
    rating: {type: RatingSchema },
    shared: { type: Boolean, require: true, default: false},
    cards: [CardSchema],
    verify: { type: String },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Set", SetSchema);
