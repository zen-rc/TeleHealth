// const Post = require("../models/Post");
// const User = require("../models/User");
// const { sendEmail } = require("../services/nodemailer");

module.exports = {
  getChat: (req, res) => {
    res.render("chat.ejs", {user:req.user});
  },
};

