const jwt = require('jsonwebtoken');

const AppError = require('../utils/appError');
const { User } = require('../models');

module.exports = async (req, res, next) => {
  try {
    const { state } =req.query;

    const payload = jwt.verify(
      state,
      process.env.JWT_SECRET_KEY || 'private_key'
    );

    const user = await User.findOne({
      where : {
        id: payload.id,

      },
      attributes: { exclude: ['password', 'googleId'] }
    });
      if (!user) {
        throw new AppError('unauthenticated', 401);
      }

      req.user = user;
      next();
    } catch (err) {
      next(err);
    }
  };
