const User = require("../model/user");
const bcrpyt = require("bcrypt");

exports.logout = async (req, res) => {
  await req.session.destroy();
  res.redirect("/");
};

exports.postSignUp = async (req, res) => {
  try {
    let fullName = req.body.fullName,
      email = req.body.email,
      password = req.body.password;

    let username = email.split("@")[0];

    let hashedPassword = await bcrpyt.hash(password, 12);

    const user = await User.create({
      name: fullName,
      email,
      password: hashedPassword,
      admin: true,
      username: username,
      posts: [{}],
    });

    // console.log(user)
    req.session.isLoggedIn = true;
    req.session.user = user;

    res.redirect("/");
  } catch (err) {
    console.log("err");
  }
};

exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body; //object destructuring
    let user = await User.findOne({
      email: email,
    });

    if (user) {
      let hashedPassword = user.password;

      const result = await bcrpyt.compare(password, hashedPassword);
      if (result) {
        req.session.isLoggedIn = true;
        req.session.user = user;
        res.redirect("/");
      } else {
        await req.flash("message", "invalid email or password");
        res.redirect("/login");
      }
    } else {
      await req.flash("message", "invalid email or password");
      res.redirect("/login");
    }
  } catch (err) {
    console.log("error");
  }
};

exports.getLogin = async (req, res) => {
  try {
    const csrfToken = req.csrfToken();
    const message = await req.consumeFlash("message");
    res.render("register/login", { message: message[0], csrfToken });
  } catch (err) {
    console.log("error");
  }
};
exports.getSignUp = (req, res) => {
  const csrfToken = req.csrfToken();
  res.render("register/signup", { csrfToken });
};
