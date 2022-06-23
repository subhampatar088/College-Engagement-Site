const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, //title becomes compulsory
  },
  type: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: String,
  date: {
    type: Date,
  },
  upvote: Number,
  hashTags: Array,
});

module.exports = mongoose.model("post", postSchema);
