const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const qrcodejs = require("qrcodejs");
// 
module.exports = {
  getProfile: async (req, res) => {
    try {
    console.log("this is user ID", typeof req.user._id)
      const posts = await Post.find({ user: req.user._id }); //added an underscore to ID
      res.render("profile.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.render("post.ejs", { post: post, user: req.user, qrcode: qrcodejs });
    } catch (err) {
      console.log(err);
    }
  },
  getEdit: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.render("edit.ejs", { post: post, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    const { 
      name,
      grade,
      teacher,
      age,
      weight,
      blood_type,
      allergies,
      conditions,
      primary_contact,
      secondary_contact,
    } = req.body
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
// make a call to the database
// check db
// create conditional if(post.findOne returns one) need to check the database if one exists already.
// post.findOne

      await Post.create({
        name,
        grade,
        teacher,
        age,
        weight,
        blood_type,
        allergies,
        conditions,
        primary_contact,
        secondary_contact,
        user: req.user.id,
        image: result.secure_url,
        cloudinaryId: result.public_id,
      });
      console.log("Post has been added!");
      res.redirect("/feed");
    } catch (err) {
      console.log(err);
    }
  },

  updatePost: async (req, res) => {
    try {
      console.log(req)
      const post = await Post.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
        console.log(post)
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  editPost: async (req, res) => {
    console.log(req.body)
    console.log(req.params.id)
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: { 
            name: req.body.name,
            grade: req.body.grade,
            teacher: req.body.teacher,
            age: req.body.age,
            weight: req.body.weight,
            blood_type: req.body.blood_type,
            allergies: req.body.allergies,
            conditions: req.body.conditions,
            primary_contact: req.body.primary_contact,
            secondary_contact: req.body.secondary_contact
          },
        }
      );
      console.log("update complete")
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  
  
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/feed");
    } catch (err) {
      res.redirect("/feed");
    }
  },
};
