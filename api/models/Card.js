const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    question: { type: String, require: true },
    img: { type: String, require: true },
    // year: { type: String },
    collect: { type: String, require: true },
    uploadby: { type: String },
    verify: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Card", CardSchema);

