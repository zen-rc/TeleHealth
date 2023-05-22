const Post = require("../models/Post");
const User = require("../models/User");
const { sendEmail } = require("../services/nodemailer");

module.exports = {
getChat: async (req, res) => {
    try {
      const users = await User.find();
      console.log('user found')
      const sellers = users.filter((user) => user.userType === 'seller')
      res.render("chatHome.ejs", {
        user: req.user.email,
        sellers,//need to edit this code to be associated to a specific post
      });
    } catch (err) {
      console.log(err);
    }
  },
  startChat: async (req, res) => {
    try {
      console.log(req.params)
      res.render("chatRoom.ejs");
    } catch (err) {
      console.log(err);
    }
  },
}