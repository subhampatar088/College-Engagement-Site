const Post = require("../model/post");

exports.getInputForm = (req, res) => {
  res.render("create-post.ejs");
};

exports.createPost = async (req, res) => {
  console.log(req.body.title, req.body.content);
  let { title, content } = req.body;
  let hashTags = content.split(" ").filter((str) => str.startsWith("#"));
  try {
    const post = await Post.create({
      title,
      content,
      type: "Blog",
      author: req.session.user.username,
      date: new Date(),
      upvote: 0,
      hashTags: hashTags,
    });
    // const posts = await Post.find({});
    console.log(post);
    //res.render("posts.ejs", { posts: posts });
    res.redirect("/blog");
  } catch (err) {
    console.log(err);
  }
};
