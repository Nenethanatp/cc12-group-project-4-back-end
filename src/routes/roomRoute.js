const express = require('express');
const roomController = require('../controllers/roomController');

const router = express.Router();

router.get('/findRoom/:userId1/:userId2', roomController.getRoom);

router.get('/get/:room', roomController.getAllMessages);

router.post('/create', roomController.createRoom);

router.post('/createMessage', roomController.createMessage);

module.exports = router;
