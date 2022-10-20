const fs = require('fs');
const { Comment, User, sequelize } = require('../models');
const cloudinary = require('../utils/cloudinary');
const AppError = require('../utils/appError');

exports.createComment = async (req, res, next) => {
  let t;
  try {
    t = await sequelize.transaction();
    const { content } = req.body;

    if (!content || !content.trim()) {
      throw new AppError('content is required', 400);
    }

    let commentImage;
    if (req.file) {
      commentImage = await cloudinary.upload(req.file.path);
      fs.unlinkSync(req.file.path);
    }
    const newComment = await Comment.create(
      {
        content: content,
        imageUrl: commentImage,
        userId: req.user.id,
        postId: req.params.id
      },
      { transaction: t }
    );
    await t.commit();

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
    await t.rollback();
    next(err);
  }
};

exports.updateComment = async (req, res, next) => {
  try {
    const { newContent } = req.body;

    const oldComment = await Comment.findOne({ where: { id: req.params.id } });

    const update = {};

    if (content) {
      update.content = newContent;
    } else {
      update.content = oldComment.content;
    }

    let updateCommentImage;
    if (req.file) {
      updateCommentImage = cloudinary.upload(req.file.path);
      update.imageUrl = await updateCommentImage;
      fs.unlinkSync(req.file.path);
    } else {
      update.image_url = oldComment.image_url;
    }

    await Comment.update(
      {
        content: update.content,
        imageUrl: update.imageUrl
      },
      { where: { id: req.params.id } }
    );

    res.status(201).json({ message: 'success update comment' });
  } catch (err) {
    next(err);
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findOne({ where: { id: req.params.id } });

    if (!comment) {
      throw new AppError(`don't have comment to delete`, 400);
    }

    await Comment.destroy({
      where: [{ id: req.params.id }]
    });
    res.status(201).json({ message: 'delete success' });
  } catch (err) {
    next(err);
  }
};
