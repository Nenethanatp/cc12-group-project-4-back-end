const express = require('express');
const adminController = require('../controllers/adminController');
const adminAuthenticate = require('../middlewares/adminAuthenticate');

const router = express.Router();

router.delete('/post/:id', adminAuthenticate, adminController.deletePost);

router.get(
  '/post/reported',
  adminAuthenticate,
  adminController.getReportedPost
);

module.exports = router;
