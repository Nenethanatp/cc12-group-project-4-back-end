const express = require('express');
const typeController = require('../controllers/typeController');
const authenticate = require('../middlewares/authenticate');
const subscribe = require('../middlewares/subscribe');

const router = express.Router();

router.get('/', authenticate, typeController.getAll);

module.exports = router;
