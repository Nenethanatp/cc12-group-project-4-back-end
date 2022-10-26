const { Transaction, Subscription, Package } = require('../models');

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
