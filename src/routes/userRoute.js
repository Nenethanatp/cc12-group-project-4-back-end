const express = require('express');
const userController = require('../controllers/userController');
const authenticate = require('../middlewares/authenticate');
const upload = require('../middlewares/upload');

const router = express.Router();

router.patch(
  '/me',
  authenticate,
  upload.single('imageUrl'),
  userController.updateMe
);

router.get('/:id', authenticate, userController.getUserById);

module.exports = router;
