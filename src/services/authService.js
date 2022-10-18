const { User } = require('../models');

exports.createUser = async (input) => {
  const user = await User.create(input);
  return user;
};

exports.getUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};
