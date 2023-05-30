const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  grade: {
    required: true,
    type: String,
  },
  teacher: {
    required: true,
    type: String,
  },
  age: {
    required: true,
    type: String,
  },
  weight: {
    required: true,
    type: String,
  },
  blood_type: {
    required: true,
    type: String,
  },
  allergies: {
    required: true,
    type: String,
  },
  conditions: {
    required: true,
    type: String,
  },
  primary_contact: {
    required: true,
    type: String,
  },
  secondary_contact: {
    required: true,
    type: String,
  },
  emergency_instructions: {
    type: String,
  },
  special_instructions: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  image: {
    type: String,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model("Post", PostSchema);
