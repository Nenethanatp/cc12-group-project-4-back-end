const {
  Post,
  Type,
  Location,
  PostImage,
  Like,
  User,
  Report,
  Comment,
} = require("../models");

exports.getAllPost = async (queryString) => {
  const posts = await Post.findAll({
    where: queryString,

    include: [
      { model: Type, attributes: { exclude: ["createdAt", "updatedAt"] } },
      { model: Location, attributes: { exclude: ["createdAt", "updatedAt"] } },
      { model: PostImage, attributes: { exclude: ["createdAt", "updatedAt"] } },
      { model: Like, attributes: { exclude: ["createdAt", "updatedAt"] } },
      {
        model: User,
        attributes: {
          exclude: ["createdAt", "updatedAt", "password", "googleId"],
        },
      },
      { model: Report, attributes: { exclude: ["createdAt", "updatedAt"] } },
      {
        model: Comment,
        include: [
          {
            model: User,
            attributes: {
              exclude: ["createdAt", "updatedAt", "password", "googleId"],
            },
          },
        ],
      },
    ],
  });
  return posts;
};

exports.getPostbyId = async (id) => {
  const post = await Post.findOne({
    where: { id },
    include: [
      { model: Type, attributes: { exclude: ["createdAt", "updatedAt"] } },
      { model: Location, attributes: { exclude: ["createdAt", "updatedAt"] } },
      { model: PostImage, attributes: { exclude: ["createdAt", "updatedAt"] } },
      { model: Like, attributes: { exclude: ["createdAt", "updatedAt"] } },
      {
        model: User,
        attributes: {
          exclude: ["createdAt", "updatedAt", "password", "googleId"],
        },
      },
      { model: Report, attributes: { exclude: ["createdAt", "updatedAt"] } },
      { model: Comment },
    ],
  });
  return post;
};

exports.deletePostById = async (id) => {
  const result = await Post.destroy({ where: { id } });
  return result;
};

exports.deletePostImageById = async (imageId) => {
  const result = await PostImage.destroy({ where: { id: imageId } });
  console.log(result);
  return result;
};

exports.getAllReported = async () => {
  const reportedPosts = await Post.findAll({
    include: [
      { model: PostImage, attributes: { exclude: ["createdAt", "updatedAt"] } },
      { model: Type, attributes: { exclude: ["createdAt", "updatedAt"] } },
      { model: Location, attributes: { exclude: ["createdAt", "updatedAt"] } },
      { model: Report, required: true },
      { model: User, attributes: { exclude: ["password", "googleId"] } },
      { model: Comment },
    ],
  });
  return reportedPosts;
};
