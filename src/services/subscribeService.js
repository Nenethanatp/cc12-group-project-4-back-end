const { Transaction, Package } = require('../models');

exports.createTransaction = async () => {
  const transaction = await Transaction.create(input);
  return transaction;
};

exports.createSubscription = async (input) => {
  const subscribe = await Transaction.create(input);
  return subscribe;
};

exports.getAllPackages = async () => {
  const allPackages = await Package.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });
  return allPackages;
};
