const mongoose = require("mongoose");

const NamespaceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    coll: { type: [String] },
    verify: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Namespace", NamespaceSchema);
