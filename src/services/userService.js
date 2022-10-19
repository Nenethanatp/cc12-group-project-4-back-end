const { User } = require('../models');

exports.updateUser = async (id, input) => {
  const user = await User.update(input, { where: { id } });
  return user;
};

exports.fetchUserById = async (id) => {
  const user = await User.findOne({
    where: { id },
    attributes: { exclude: ['password', 'googleId'] },
  });
  return user;
};

exports.isGoogleSignin = async (id) => {
  const user = await User.findOne({
    where: { id },
  });
  if (user.googleId) {
    return true;
  }
  return false;
};
