const express = require('express');
const postController = require('../controllers/postController');
const upload = require('../middlewares/upload');
const authenticate = require('../middlewares/authenticate');
const likeController = require('../controllers/likeController');
const commentController = require('../controllers/commentController');
const reportController = require('../controllers/reportController');

const router = express.Router();

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
router.patch(
  '/:id/updateComments',
  authenticate,
  upload.single('updateCommentImage'),
  commentController.updateComment
);
router.delete(
  '/:id/deleteComments',
  authenticate,
  commentController.deleteComment
);
router.post('/:id/reports', authenticate, reportController.addReport);

router.get('/', authenticate, postController.getAll);
router.get('/follows', authenticate, postController.getPostsByFollowing);
router.get('/:id', authenticate, postController.getById);

router.put(
  '/:id',
  authenticate,
  upload.fields([{ name: 'postImage' }]),
  postController.updatePost
);

router.delete('/:id', authenticate, postController.deleteById);

router.delete(
  '/:id/images/:imageId',
  authenticate,
  postController.deletePostImageById
);

module.exports = router;
