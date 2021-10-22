const router = require("express").Router();
const UserController = require("../../controllers/users/user.controller");
const multer = require("multer");
const upload = multer();

router.get("/", UserController.getAllUsers);
router
  .route("/:id")
  .get(UserController.getOneUser)
  .put(UserController.updateUser)
  .delete(UserController.deleteUser);

router.post(
  "/upload",
  upload.single("file"),
  UserController.uploadProfile
);

router.patch("/follow/:id", UserController.followUser);
router.patch("/unfollow/:id", UserController.unFollowUser);

module.exports = router;
