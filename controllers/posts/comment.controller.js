const Post = require("../../models/post.model");
const User = require("../../models/user.model");
const { ObjectId } = require("../../tools/all");

exports.makeComment = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Invalid id");
  }
  try {
    const createPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterPseudo: req.body.commenterPseudo,
            commenterText: req.body.commenterText,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true }
    );
    createPost && res.status(200).json(createPost);
  } catch (err) {
    res.status(500).json({ errors: err.message });
  }
};

exports.editComment = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Invalid id");
  }
  try {
    return Post.findById(req.params.id, (err, docs) => {
      const comments = docs.comments.find((comment) =>
        comment._id.equals(req.body.commentId)
      );
      console.log(comments);
      if (!comments) return res.status(400).json("Aucun commentaire trouvé");
      comments.commenterText = req.body.commenterText;

      return docs.save((err) => {
        if (err) return res.status(400).json(err);
        else return res.status(200).json("Commentaire edité avec succès");
      });
    });
  } catch (err) {
    res.status(500).json({ errors: err.message });
  }
};

exports.deleteComment = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Invalid id");
  }
  try {
    return Post.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: {
            _id: req.body.commentId,
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (err) return res.status(400).json(err);
        else return res.status(200).json("Commentaire supprimer :" + docs);
      }
    );
  } catch (err) {
    res.status(500).json({ errors: err.message });
  }
};
