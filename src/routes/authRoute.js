const express = require('express');
const authController = require('../controllers/authController');
const authenticate = require('../middlewares/authenticate');
const subscribe = require('../middlewares/subscribe');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', authenticate, subscribe, authController.getMe);
router.post('/googleLogin', authController.googleLogin);

module.exports = router;
