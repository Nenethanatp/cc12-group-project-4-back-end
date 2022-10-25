const { Report, Post } = require('../models');

exports.addReport = async (req, res, next) => {
  try {
    const wherePost = await Post.findOne({ where: { id: req.params.id } });

    const report = await Report.create({
      postId: wherePost.id,
      userId: req.user.id
    });

    res.status(200).json({ report });
  } catch (err) {
    next(err);
  }
};
