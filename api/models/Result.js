const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema(
  {
    learnTotalAll: { type: Number },
    TotalAll: { type: Number },
  },
  {timestamps: true}
);

module.exports = mongoose.model("Result", ResultSchema);
