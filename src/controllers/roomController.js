const roomService = require('../services/roomService');
const AppError = require('../utils/appError');

exports.getRoom = async (req, res, next) => {
  try {
    const { userId1, userId2 } = req.params;
    const result = await roomService.getRoom(userId1, userId2);
    if (!result) {
      res.status(200).json({});
    }
    res.status(200).json({ result });
  } catch (err) {
    next(err);
  }
};

exports.createRoom = async (req, res, next) => {
  try {
    const { room, userId1, userId2 } = req.body;
    const result = await roomService.createRoom(room, userId1, userId2);
    res.status(200).json({ result });
  } catch (err) {
    next(err);
  }
};

exports.createMessage = async (req, res, next) => {
  try {
    const { room, userId, message } = req.body;
    const result = await roomService.createMessage(room, userId, message);
    res.status(200).json({ result });
  } catch (err) {
    next(err);
  }
};

exports.getAllMessages = async (req, res, next) => {
  try {
    const { room } = req.params;
    const result = await roomService.getAllMessages(room);
    res.status(200).json({ result });
  } catch (err) {
    next(err);
  }
};
