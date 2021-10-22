const router = require('express').Router();
const AuthController = require('../../controllers/users/auth.controller');

router.post('/register', AuthController.signUp);
router.post('/login', AuthController.signIn);
router.get('/logout', AuthController.signOut);

module.exports = router;