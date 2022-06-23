const Post = require("../model/post");

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Post.find({});
    res.render("blog.ejs", { blogs });
  } catch (err) {
    console.log(err);
  }
};

exports.getAllNotices = async (req, res) => {
  try {
    const notices = await Post.find({ type: "notice" });
    res.render("notice.ejs", { notices });
  } catch (err) {
    console.log(err);
  }
};
