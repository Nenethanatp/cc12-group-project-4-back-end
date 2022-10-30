const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authService = require('../services/authService');
const AppError = require('../utils/appError');
const { isGoogleSignin } = require('../services/userService');

const genToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY || 'private_key', {
    expiresIn: process.env.JWT_EXPIRES || '1d',
  });
};

exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    const schema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string()
        .email({ tlds: { allow: ['com', 'net'] } })
        .required(),
      password: Joi.string().required(),
      confirmPassword: Joi.ref('password'),
    }).with('password', 'confirmPassword');

    const { error } = schema.validate({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    });

    if (error) {
      throw new AppError(error, 400);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await authService.createUser({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    const token = genToken({ id: user.id, role: user.role });
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const schema = Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: ['com', 'net'] } })
        .required(),
      password: Joi.string().required(),
    });
    const { error } = schema.validate({
      email,
      password,
    });
    if (error) {
      throw new AppError(error, 400);
    }
    const user = await authService.getUserByEmail(email);
    if (!user) {
      throw new AppError('email address or password is invalid', 400);
    }
    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect) {
      throw new AppError('email address or password is invalid', 400);
    }

    const token = genToken({ id: user.id, role: user.role });
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.getMe = async (req, res, next) => {
  const ggSignin = await isGoogleSignin(req.user.id);
  res
    .status(200)
    .json({ user: req.user, status: req.status, ggSignin: ggSignin });
};

exports.googleLogin = async (req, res, next) => {
  try {
    const { firstName, lastName, email, googleId } = req.body;
    const schema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string()
        .email({ tlds: { allow: ['com', 'net'] } })
        .required(),
      googleId: Joi.string().required(),
    });
    const { error } = schema.validate({ firstName, lastName, email, googleId });
    if (error) {
      throw new AppError(error, 400);
    }
    const existUser = await authService.getUserByEmail(email);
    if (existUser) {
      const token = genToken({ id: existUser.id });
      return res.status(200).json({ token });
    }

    const user = await authService.createUser({
      firstName,
      lastName,
      email,
      googleId,
    });
    const token = genToken({ id: user.id });

    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};
