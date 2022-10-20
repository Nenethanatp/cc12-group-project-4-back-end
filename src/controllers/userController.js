const { getUserByEmail } = require('../services/authService');
const bcrypt = require('bcryptjs');
const AppError = require('../utils/appError');
const {
  updateUser,
  fetchUserById,
  isGoogleSignin,
} = require('../services/userService');
const cloudinary = require('../utils/cloudinary');
const fs = require('fs');
exports.updateMe = async (req, res, next) => {
  const file = req.file;
  try {
    const { oldPassword, newPassword, imageUrl } = req.body;
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
      throw new AppError('User is not found');
    }
    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};