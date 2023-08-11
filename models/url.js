const mongoose = require("mongoose");
const shortId = require("shortid");

const urlSchema = new mongoose.Schema({
  long: {
    type: String,
    required: true,
  },

  short: {
    type: String,
    required: true,
    default: shortId.generate,
  },

  created_at: {
    type: Date,
    default: Date.now,
  },

  clicks: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("urlModel", urlSchema);
