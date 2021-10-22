const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: [true, 'This field is required, cannot be empty'],
      minlength: [3, 'Pseudo must be at least 3 characters long'],
      maxlength: [55, "Pseudo must be at most 55 characters long"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'This field is required, cannot be empty'],
      validate: [isEmail, "Please provide an valid email"],
      lowercase: true,
      trim: true,
      unique: true
    },
    password: {
      type: String,
      required: [true, 'This field is required, cannot be empty'],
      minlength: [6, 'Password must be at least 6 characters'],
      max: 1024,
    },
    picture: String,
    bio: {
      type: String,
      maxlength: 500
    },
    followers: [String],
    following: [String],
    likes: [String],
  },
  { timestamps: true }
);

// Use mongoose pre hooks for hashing a password before saved it in database
userModel.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  this.password = bcrypt.hashSync(
    this.password,
    bcrypt.genSaltSync(process.env.BCRYPT_SALT)
  );
  next();
});

userModel.post('save', function (doc, next) {
  console.log('New user data created %s', doc);
  next();
});

userModel.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) return user;
    throw new Error('Password incorrect');
  }
  throw new Error('Email incorrect');
}

userModel.statics.getSignedToken = async function (id) {
  const token = await jwt.sign({ id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_DATE }
  );
  return token;
}

module.exports = mongoose.model('user', userModel);