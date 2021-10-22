const Post = require("../../models/post.model");
const { ObjectId, imageMimeType, imageSize } = require("../../tools/all");
const [fs, { promisify }] = require("../../tools/loadModule")(["fs", "util"]);
const pipeline = promisify(require("stream").pipeline);
const handleErrors = require("../../tools/errorHandler");



/**
 * @route POST /api/posts
 * @desc Allow to create new post
 * @access Private
 */
exports.createPost = async (req, res) => {
  let filename;

  if (req.file !== null) {
    if (!imageMimeType(req.file.mimetype))
      throw Error("Format d'images incorrect");

    if (imageSize(req.file.size)) throw Error("Taille d'image trop grande");

    filename = req.body.posterId + Date.now() + ".jpg";

    await pipeline(
      req.file.stream,
      fs.createWriteStream(
        `${relativeClientPath(2)}client/public/uploads/posts/${filename}`
      )
    );
    console.log(req.file);
  }
  const newPost = new Post({
    posterId: req.body.posterId,
    message: req.body.message,
    picture: req.file !== null ? "./uploads/posts/" + filename : "",
    video: req.body.video,
    likers: [],
    comments: [],
  });

  try {
    const post = await newPost.save();
    post && res.status(201).json({ post });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(500).json({ errors });
  }
};

/**
 * @route GET /api/posts
 * @desc Allow to get all posts
 * @access Private
 */
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ createdAt: -1 });
    posts.length === 0
      ? res.status(404).json("Aucun post trouvé")
      : res.status(200).json({ posts });
  } catch (err) {
    res.status(500).json({ errors: err.message });
  }
};

/**
 * @route GET /api/posts/{postID} -> postId id du post
 * @desc Allow to get a single post
 * @access Private
 */
exports.getSinglePost = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Invalid id");
  }

  try {
  } catch (err) {
    res.status(500).json({ errors: err.message });
  }
};

/**
 * @route PUT /api/posts/{postID} -> postId id du post
 * @desc Allow to update a single post
 * @access Private
 */
exports.updatePost = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Invalid id");
  }
  try {
    const updateRecord = { message: req.body.message };
    await Post.findByIdAndUpdate(
      req.params.id,
      { $set: updateRecord },
      { new: true },
      (err, docs) => {
        if (err) res.status(400).json(err);
        else res.status(200).json(`Post updated successfully: ${docs.message}`);
      }
    );
  } catch (err) {
    res.status(500).json({ errors: err.message });
  }
};

/**
 * @route DELETE /api/posts/{postID} -> postId id du post
 * @desc Allow to delete single post
 * @access Private
 */
exports.deletePost = async (req, res) => {
  try {
    const delPost = await Post.findByIdAndDelete(req.params.id);
    delPost && res.status(200).json("Post deleted successfully");
  } catch (err) {
    res.status(500).json({ errors: err.message });
  }
};
