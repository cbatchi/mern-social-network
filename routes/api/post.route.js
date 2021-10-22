const router = require('express').Router();
const PostController = require('../../controllers/posts/post.controller');
const LikeController = require('../../controllers/posts/like.controller');
const CommentController = require('../../controllers/posts/comment.controller');
const multer = require("multer");
const upload = multer();

// Route for crud posts
  router.route('/')
    .get(PostController.getPosts)
    .post(upload.single('file'), PostController.createPost);


  router.route('/:id')
    .get(PostController.getSinglePost)
    .put(PostController.updatePost)
    .delete(PostController.deletePost);


// Routes for like posts
  router.patch('/like-post/:id', LikeController.likePost);
  router.patch('/unlike-post/:id', LikeController.unlikePost);



// Routes for comment posts
  router.patch('/comment-post/:id', CommentController.makeComment);
  router.patch('/comment-post-edit/:id', CommentController.editComment);
  router.patch('/comment-post-delete/:id', CommentController.deleteComment);


module.exports = router;  
