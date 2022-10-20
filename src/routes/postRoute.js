const express = require('express');
const postController = require('../controllers/postController');
const upload = require('../middlewares/upload');
const authenticate = require('../middlewares/authenticate');
const likeController = require('../controllers/likeController');
const commentController = require('../controllers/commentController');
const reportController = require('../controllers/reportController');

const router = express.Router();

// router.get('/', postController.getAll);

// router.get('/:id', postController.getById);

router.post(
  '/',
  authenticate,
  upload.fields([{ name: 'postImage' }]),
  postController.createPost
);

router.post('/:id/likes', authenticate, likeController.toggleLike);
router.post(
  '/:id/comments',
  authenticate,
  upload.single('commentImage'),
  commentController.createComment
);

router.post('/:id/reports', authenticate, reportController.addReport);

module.exports = router;
