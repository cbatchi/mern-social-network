const mongoose = require("mongoose");


// Model Schema des posts
const postModel = new mongoose.Schema(
  {
    posterId: {
      type: String,
      required: [true, "Poster id is required"],
    },
    message: {
      type: String,
      required: [true, "Message is required, cannot be empty"],
      trim: true,
      maxlength: [500, "Message cannot be exceed 500 characters"],
    },
    picture: String,
    video: String,
    likers: {
      type: [String],
      required: true,
    },
    comments: {
      type: [
        {
          commenterId: String,
          commenterPseudo: String,
          commenterText: String,
          timestamp: Number,
        },
      ],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("post", postModel);
