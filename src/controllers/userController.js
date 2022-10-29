const { getUserByEmail } = require('../services/authService');
const bcrypt = require('bcryptjs');
const AppError = require('../utils/appError');
const {
  updateUser,
  fetchUserById,
  isGoogleSignin,
  fetchUsersByName
} = require('../services/userService');

const favoriteService = require('../services/favoriteService');

const lineService = require('../services/lineService');
const cloudinary = require('../utils/cloudinary');
const fs = require('fs');
exports.updateMe = async (req, res, next) => {
  const file = req.file;
  try {
    const { oldPassword, newPassword, imageUrl, description } = req.body;
    const update = {};
    const oldUser = await getUserByEmail(req.user.email);
    if (!(await isGoogleSignin(oldUser.id))) {
      if (newPassword) {
        if (oldPassword && newPassword) {
          const isCorrect = await bcrypt.compare(oldPassword, oldUser.password);
          if (!isCorrect) {
            throw new AppError('Old password is incorrect', 400);
          }
          update.password = await bcrypt.hash(newPassword, 10);
        } else {
          throw new AppError(
            'Change password require old password and new password'
          );
        }
      }
    }

    if (description) {
      update.description = description;
    }

    if (file) {
      const secureUrl = await cloudinary.upload(
        file.path,
        imageUrl ? cloudinary.getPublicId(imageUrl) : null
      );
      update.imageUrl = secureUrl;
    }

    if (Object.keys(update).length !== 0) {
      const updated = await updateUser(req.user.id, update);

      res.status(200).json({ message: 'Success update profile' });
    } else {
      throw new AppError('Nothing to update', 400);
    }
  } catch (err) {
    next(err);
  } finally {
    if (file) {
      fs.unlinkSync(file.path);
    }
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const user = await fetchUserById(id);
    if (!user) {
      throw new AppError('User is not found', 400);
    }
    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};

exports.getUserByName = async (req, res, next) => {
  try {
    const { name } = req.query;
    if (!name) {
      throw new AppError('invalid input', 400);
    }
    const newUsers = await fetchUsersByName(name);
    if (!newUsers) {
      throw new AppError('User not found', 400);
    }
    const users = newUsers.filter((item) => item.id !== req.user.id);
    res.status(200).json({ users });
  } catch (err) {
    next(err);
  }
};

exports.lineCallback = async (req, res, next) => {
  try {
    const { code, state } = req.query;
    const user = req.user;

    const access_token = await lineService.login(code);
    // console.log('555')
    // console.log(access_token)

    await updateUser(req.user.id, { ...user, lineAccessToken: access_token });

    res.send('<script>window.close();</script>');
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.notify = async (req, res, next) => {
  try {
    const user = req.user;

    const postService = require('../services/postService');
    const post = await postService.getPostbyId(2);

    const res = await lineService.notify(user, post);

    res.status(200).json({ res });
  } catch (err) {
    next(err);
  }
};

exports.addFavorite = async (req, res, next) => {
  try {
    const user = req.user;
    const { name, latitude, longitude } = req.body;

    const data = {
      name: name,
      userId: user.id,
      latitude: latitude,
      longitude: longitude,
    }

    console.log(data);

    const favorite = await favoriteService.create(data);

    res.status(200).json({ favorite });


  } catch (err) {
    next(err);
  }
};

exports.getFavorites = async (req, res, next) => {
  try {
    const user = req.user;
    const favorites = await favoriteService.getByUserId(user.id);
    res.status(200).json({ favorites });
  } catch (err) {
    next(err);
  }
}

exports.deleteFavorite = async (req, res, next) => {
  try {
    const user = req.user;
    const favoriteId = req.params.id;
    const resp = await favoriteService.delete(user.id, favoriteId);
    res.status(200).json({ resp });
  } catch (err) {
    next(err);
  }
}

