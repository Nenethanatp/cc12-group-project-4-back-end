const { Post } = require('../models');
const {
  deletePostById,
  deletePostImageById,
  getAllReported,
} = require('../services/postService');

exports.deletePost = async (req, res, next) => {
  const { id } = req.params;
  try {
    await deletePostImageById(id);

    const result = await deletePostById(id);
    if (result === 0) {
      res.status(200).json({ message: 'This post already been deleted' });
    }
    res.status(200).json({ message: 'Success delete' });
  } catch (err) {
    console.log(err);
  }
};

exports.getReportedPost = async (req, res, next) => {
  try {
    const reportedPosts = await getAllReported();
    if (reportedPosts.length === 0) {
      res.status(200).json({ message: 'Not found any post with reported' });
    }

    reportedPosts.sort((a, b) =>
      a.Reports.length > b.Reports.length ? -1 : 1
    );
    res.status(200).json({ reportedPosts });
  } catch (err) {
    console.log(err);
  }
};
