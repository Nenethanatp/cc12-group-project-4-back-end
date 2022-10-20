const fs = require('fs');
const { sequelize, Comment, User } = require('../models');
const cloudinary = require('../utils/cloudinary');
const AppError = require('../utils/appError');

exports.createComment = async (req, res, next) => {
  let cm;
  try {
    cm = await sequelize.transaction();
    const { content } = req.body;

    if (!content || !content.trim()) {
      throw new AppError('content is required', 400);
    }

    let commentImage;
    if (req.file) {
      commentImage = await cloudinary.upload(req.file.path);
      fs.unlinkSync(req.file.path);
    }

    const newComment = await Comment.create({
      content: content,
      image_url: commentImage,
      userId: req.user.id,
      postId: req.params.id
    });

    const comment = await Comment.findOne({
      where: { id: newComment.id },
      attributes: { exclude: 'userId' },
      include: {
        model: User,
        attributes: { exclude: ['password', 'googleId'] }
      }
    });

    res.status(201).json({ comment });
  } catch (err) {
    next(err);
  }
};
