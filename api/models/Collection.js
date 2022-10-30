const mongoose = require("mongoose");

const CollectionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, require: true },
    classify: { type: String, require: true },
    uploadby: { type: String },
    verify: { type: String },
    shared: { type: Boolean, require: true, default: false}
    // author: { type: String, require: true}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Collection", CollectionSchema);
