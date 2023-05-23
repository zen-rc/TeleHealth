const Post = require("../models/Post");
const User = require("../models/User");
// const { sendEmail } = require("../services/nodemailer");

module.exports = {
  getChat: async (req, res) => {
    try {
      const postId = req.params.postId;
      const post = await Post.findById(postId);
      const chatMessages = await ChatMessage.find({ postId }); // Retrieve chat messages associated with the post

      res.render("chatRoom.ejs", {
        post: post,
        chatMessages: chatMessages,
        user: req.user,
      });
    } catch (err) {
      console.log(err);
    }
  },

}
