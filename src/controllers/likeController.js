const { Like } = require('../models');

exports.toggleLike = async (req, res, next) => {
  try {
    const disLike = await Like.findOne({
      where: { userId: req.user.id, postId: req.params.id }
    });

    if (disLike) {
      await disLike.destroy();
      return res.status(200).json({ like: null });
    }

    const like = await Like.create({
      userId: req.user.id,
      postId: req.params.id
    });

    res.status(201).json({ like });
  } catch (err) {
    next(err);
  }
};
