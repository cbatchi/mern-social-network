exports.ObjectId = require('mongoose').Types.ObjectId;

exports.isEmptyObject = obj => Object.keys(obj).map(keys => obj[keys].length === 0);

exports.maxAge = 3 * 24 * 60 * 60 * 1000;

exports.imageMimeType = image => image !== 'image/jpg' && image !== 'image/jpeg' && image !== 'image/png'
exports.imageSize = image => image > 5000000;
exports.relativeClientPath = (deep) => require('path').join(__dirname, deep === 1 ? '../' : deep === 2 ? '../' : '../');
