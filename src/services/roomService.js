const { Op } = require('sequelize');
const { ChatUser, ChatMessage } = require('../models');

exports.getRoom = async (userId1, userId2) => {
  const result = await ChatUser.findOne({
    where: {
      [Op.or]: [
        { user1: userId1, user2: userId2 },
        { user1: userId2, user2: userId1 }
      ]
    }
  });
  return result;
};

exports.createRoom = async (room, userId1, userId2) => {
  const result = await ChatUser.create({
    room,
    user1: userId1,
    user2: userId2
  });
  return result;
};

exports.createMessage = async (room, userId, message) => {
  const result = await ChatMessage.create({
    room,
    user: userId,
    message
  });
  return result;
};

exports.getAllMessages = async (room) => {
  const result = await ChatMessage.findAll({ where: { room } });
  return result;
};
