const express = require('express');
const authController = require('../controllers/authController');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.post('/register', authController.register);
router.get('/me', authenticate, authController.getMe);

module.exports = router;
