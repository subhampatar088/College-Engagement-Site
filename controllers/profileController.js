const Post = require("../model/post");

exports.getProfile = async (req, res) => {
  let post = await Post.find({ author: req.session.user.username });
  res.send("Hi");
};
