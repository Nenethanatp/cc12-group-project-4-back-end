const { Transaction, Subscription, Package, sequelize } = require('../models');
const { Op } = require('sequelize');
const moment = require('moment');

exports.createTransaction = async (input) => {
  const transaction = await Transaction.create(input);
  return transaction;
};

exports.createSubscription = async (input) => {
  const subscribe = await Subscription.create(input);
  return subscribe;
};

exports.getAllPackages = async () => {
  const allPackages = await Package.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });
  return allPackages;
};

exports.getEndDates = async (userId) => {
  const endDates = await Subscription.findAll({
    where: { userId: Number(userId) },
    attributes: ['endDate'],
  });
  return endDates;
};

exports.hasSubscription = async (userId) => {
  console.log(moment().toDate());
  return await Subscription.findOne({
    where: {
      userId: Number(userId),
      endDate: {
        [Op.gte]: moment().toDate()
      }
    },
    order: [
      ['endDate', 'DESC'],
    ],
  });
};
