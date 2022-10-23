const { Follow } = require('../models');

exports.toggleFollow = async (req, res, next) => {
  try {
    const following = await Follow.findOne({
      where: { followerId: req.user.id, followingId: req.params.followId }
    });

    if (following) {
      await following.destroy();
      return res.status(200).json({ message: 'unFollow' });
    }

    const follow = await Follow.create({
      followerId: req.user.id,
      followingId: req.params.followId
    });

    res.status(201).json({ follow });
  } catch (err) {
    next(err);
  }
};
