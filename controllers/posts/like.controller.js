const Post = require("../../models/post.model");
const User = require("../../models/user.model");
const { ObjectId } = require("../../tools/all");

exports.likePost = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Invalid id");
  }

  try {
    await Post.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likers: req.body.idPersonWhoLike } },
      { new: true },
      (err, docs) => {
        if (err) return res.status(400).json(err);
      }
    );

    await User.findByIdAndUpdate(
      req.body.idPersonWhoLike,
      { $addToSet: { likes: req.params.id } },
      { new: true },
      (err, docs) => {
        if (err) return res.status(400).json(err);
        else return res.status(200).json(docs)
      }
    )

  } catch (err) {
    res.status(500).json({ errors: err.message });
  }
};

exports.unlikePost = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Invalid id");
  }

  try {
     await Post.findByIdAndUpdate(
      req.params.id,
      { $pull: { likers: req.body.idPersonWhoLike } },
      { new: true },
      (err, docs) => {
        if (err) return res.status(400).json(err);
      }
    );

    await User.findByIdAndUpdate(
      req.body.idPersonWhoLike,
      { $pull: { likes: req.params.id } },
      { new: true },
      (err, docs) => {
        if (err) return res.status(400).json(err);
        else return res.status(200).json(docs)
      }
    )
  } catch (err) {
    res.status(500).json({ errors: err.message });
  }
};

