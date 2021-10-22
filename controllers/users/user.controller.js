const User = require("../../models/user.model");
const { ObjectId, imageMimeType, imageSize, relativeClientPath } = require("../../tools/all");
const handleErrors = require("../../tools/errorHandler");
const fs = require("fs"),
  { promisify } = require("util"),
  pipeline = promisify(require("stream").pipeline);

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    users && res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.getOneUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Invalid id");
  }
  try {
    const user = await User.findById(req.params.id).select("-password");
    user && res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.updateUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Invalid id");
  }

  try {
    const update_user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    update_user && res.status(200).json("User successfully updated");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.deleteUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Invalid id");
  }

  try {
    const delete_user = await User.findByIdAndDelete(req.params.id);
    delete_user && res.status(200).json("User successfully delete");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.followUser = async (req, res) => {
  if (
    !ObjectId.isValid(req.params.id) ||
    !ObjectId.isValid(req.body.idToFollow)
  ) {
    res.status(400).json("Invalid id");
  }

  try {
    // add to the follower list
    await User.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { following: req.body.idToFollow } },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) res.status(201).json(docs);
        else return res.status(400).json(err);
      }
    );
    // add to following list
    await User.findByIdAndUpdate(
      req.body.idToFollow,
      { $addToSet: { followers: req.params.id } },
      { new: true, upsert: true },
      (err, docs) => {
        if (err) return res.status(400).json(err);
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

exports.unFollowUser = async (req, res) => {
  if (
    !ObjectId.isValid(req.params.id) ||
    !ObjectId.isValid(req.body.idToUnFollow)
  ) {
    res.status(400).json("Invalid id");
  }

  try {
    // Add to the follower list
    await User.findByIdAndUpdate(
      req.params.id,
      { $pull: { following: req.body.idToUnFollow } },
      { new: true, upsert: true },
      (err, doc) => {
        if (err) res.status(400).json(err.message);
        else return res.status(200).json(doc);
      }
    );
    await User.findByIdAndUpdate(
      req.body.idToUnFollow,
      { $pull: { followers: req.params.id } },
      { new: true, upsert: true },
      (err) => {
        if (err) res.status(400).json(err);
      }
    );
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.uploadProfile = async (req, res) => {
  if (!imageMimeType(req.file.mimetype))
    throw Error('Format d\'images incorrect');
  
  if (imageSize(req.file.size))
    throw Error('Taille d\'image trop grande');
  
  const fileName = req.body.name + '.jpg';
  try {
    await pipeline(
      req.file.stream,
      fs.createWriteStream(
        `${relativeClientPath(2)}client/public/uploads/profil/${fileName}`,
      )
    )
    
    await User.findByIdAndUpdate(
      req.body.userId,
      { $set: { picture: `./uploads/profil/${fileName}` } },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, doc) => {
        if (err) res.status(400).json(err)
        else res.status(200).json('picture upload successfully');
      }
    )
  } catch (err) {
    const errors = handleErrors(err);
    res.status(500).json({errors});
  }
};
