const AppError = require('../utils/appError');
const { Type } = require('../models');

exports.getAll = async (req, res, next) => {
  try {
    const type = await Type.findAll();
    res.status(200).json({ type });
  } catch (err) {
    next(err);
  }
};
