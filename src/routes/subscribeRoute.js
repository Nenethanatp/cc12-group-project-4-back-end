const express = require('express');
const SubscribeController = require('../controllers/subscribeController');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.post('/', authenticate, SubscribeController.createCharge);
router.get('/allPackage', authenticate, SubscribeController.getAll);
router.get('/endDate', authenticate, SubscribeController.getEndDate);

module.exports = router;
