const express = require('express');
const userController = require('../controllers/userController');
const authenticate = require('../middlewares/authenticate');
const lineCallbackAuthenticate =require('../middlewares/lineCallbackAuthenticate')
const upload = require('../middlewares/upload');

const router = express.Router();

router.patch(
  '/me',
  authenticate,
  upload.single('imageUrl'),
  userController.updateMe
);
router.get('/find', authenticate, userController.getUserByName);

router.get('/:id', userController.getUserById);

router.get('/line/callback', lineCallbackAuthenticate, userController.lineCallback);

router.post('/notify', authenticate, userController.notify);

module.exports = router;
