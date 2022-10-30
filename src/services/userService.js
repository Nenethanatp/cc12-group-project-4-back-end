const { Op } = require('sequelize');
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

exports.fetchUsersByName = async (name) => {
  const nameArr = name.split(' ');
  if (nameArr[1]) {
    const users = await User.findAll({
      where: {
        firstName: { [Op.like]: `%${nameArr[0]}%` },
        lastName: { [Op.like]: `%${nameArr[1]}%` },
      },
      attributes: { exclude: ['password', 'googleId'] },
    });
    return users;
  }
  const users = User.findAll({
    where: { firstName: { [Op.like]: `%${name}%` } },
    attributes: { exclude: ['password', 'googleId'] },
  });
  return users;
};
