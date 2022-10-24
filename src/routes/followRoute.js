const express = require('express');

const followController = require('../controllers/followController');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.post('/:followId', authenticate, followController.toggleFollow);
router.get('/me', authenticate, followController.getFollow);
module.exports = router;