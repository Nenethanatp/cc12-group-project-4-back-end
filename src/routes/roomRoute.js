const express = require('express');
const roomController = require('../controllers/roomController');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.get('/findRoom/:userId1/:userId2', authenticate, roomController.getRoom);

router.get('/get/:room', authenticate, roomController.getAllMessages);

router.get('/getAll', authenticate, roomController.getAllChatRooms);

router.post('/create', authenticate, roomController.createRoom);

router.post('/createMessage', authenticate, roomController.createMessage);

module.exports = router;
