const mongoose = require("mongoose");

const NamespaceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    tags: { type: [String] },
    sets: [{
      set_id: String,
      total: Number,
      learnedTotal: Number,
    }],
    verify: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Namespace", NamespaceSchema);
