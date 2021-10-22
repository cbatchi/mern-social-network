const User = require("../../models/user.model");
const { maxAge } = require("../../tools/all");
const handleErrors = require("../../tools/errorHandler");

/**
 *
 * @param {*} req
 * @param {*} res
 */
exports.signUp = async (req, res) => {
  try {
    const user = await new User(req.body).save();
    user && res.status(201).json({ id: user._id });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(500).json({errors});
  }
};

/**
 * @route POST /api/auth/login
 * @desc Allow to loggedIn a user
 * @access Public
 */
exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = await User.getSignedToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge,
    });
    res.status(200).json({ user: user._id });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(500).json({ errors });
  }
};

/**
 * @route POST /api/auth/logout
 * @desc Allow to loggedOut a user
 * @access Public
 */
exports.signOut = (req, res) => {
  res.cookie("jwt", '', { maxAge: 1 });
  res.redirect('/')
};
