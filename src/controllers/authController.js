const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authService = require('../services/authService');

const genToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY || 'private_key', {
    expiresIn: process.env.JWT_EXPIRES || '1d'
  });
};

exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    const schema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email({ tlds: { allow: ['com', 'net'] } }),
      password: Joi.string().required(),
      confirmPassword: Joi.ref('password')
    }).with('password', 'confirmPassword');

    const { error } = schema.validate({
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    });

    if (error) {
      throw new AppError(error);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await authService.createUser({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });
    const token = genToken({ id: user.id });
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.getMe = async (req, res, next) => {
  res.status(200).json({ user: req.user });
};
