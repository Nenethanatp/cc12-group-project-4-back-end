const { User } = require('../models');

exports.createUser = async (input) => {
  const user = await User.create(input);
  return user;
};
