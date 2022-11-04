const fs = require("fs");

const AppError = require("../utils/appError");
const cloudinary = require("../utils/cloudinary");
const {
  Post,
  User,
  PostImage,
  Location,
  Type,
  sequelize,
} = require("../models");
const {
  getAllPost,
  getPostbyId,
  deletePostById,
  deletePostImageById,
  getPostByUserId,
  getAllFollowingIdByUserId,
  getAllPostsByFollowingIds,
} = require("../services/postService");

const favoriteService = require("../services/favoriteService");
const lineService = require("../services/lineService");

const mapUtils = require("../utils/map");

exports.createPost = async (req, res, next) => {
  let t;
  try {
    t = await sequelize.transaction();
    const { content, typeId, latitude, longitude } = req.body;
    const data = { userId: req.user.id };
    if (!content || !content.trim()) {
      throw new AppError("content is required", 400);
    }
    if (!typeId) {
      throw new AppError("type is required", 400);
    }
    if (!latitude || !longitude) {
      throw new AppError("location is required", 400);
    }

    const isThereLocation = await Location.findOne({
      where: { latitude, longitude },
    });
    if (isThereLocation) {
      data.locationId = isThereLocation.id;
    } else {
      const newLocation = await Location.create(
        { latitude, longitude },
        { transaction: t }
      );
      data.locationId = newLocation.id;
    }

    data.content = content;
    data.typeId = typeId;

    const newPost = await Post.create(data, { transaction: t });

    if (req.files?.postImage) {
      for (let el of req.files.postImage) {
        const url = await cloudinary.upload(el.path);

        await PostImage.create(
          { imageUrl: url, postId: newPost.id },
          { transaction: t }
        );
        fs.unlinkSync(el.path);
      }
    }

    await t.commit();

    const post = await getPostbyId(newPost.id);

    const centerPoint = {
      latitude: post.Location.latitude,
      longitude: post.Location.longitude,
    };

    const radius = process.env.MARKER_RADIUS; // km

    const allFavorites = await favoriteService.getAll();
    allFavorites.forEach((favorite) => {
      if (mapUtils.arePointsNear(favorite, centerPoint, radius)) {
        console.log("within 5 km.");
        lineService.notify(favorite.User, post);
      } else {
        console.log("outside 5 km.");
      }
    });

    res.status(200).json({ post });
  } catch (err) {
    await t.rollback();
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const queryString = req.query;

    const posts = await getAllPost(queryString);
    if (!posts) {
      throw new AppError("Not found any post", 400);
    }

    posts.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    res.status(200).json({ posts });
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await getPostbyId(Number(id));
    if (!post) {
      throw new AppError("Not found this post", 400);
    }
    res.status(200).json({ post });
  } catch (err) {
    next(err);
  }
};

exports.updatePost = async (req, res, next) => {
  let t;
  try {
    t = await sequelize.transaction();
    const { id } = req.params;
    const { content, typeId, latitude, longitude } = req.body;

    if (!content || !content.trim()) {
      throw new AppError("content is required", 400);
    }
    if (!typeId) {
      throw new AppError("type is required", 400);
    }
    if (!latitude || !longitude) {
      throw new AppError("location is required", 400);
    }

    const post = await getPostbyId(Number(id));
    if (!post) {
      throw new AppError("Post not found.", 404);
    }

    post.content = content;
    post.typeId = typeId;

    const isThereLocation = await Location.findOne({
      where: { latitude, longitude },
    });
    if (isThereLocation) {
      post.locationId = isThereLocation.id;
    } else {
      const newLocation = await Location.create(
        { latitude, longitude },
        { transaction: t }
      );
      post.locationId = newLocation.id;
    }

    await post.save({ transaction: t });

    if (req.files?.postImage) {
      for (let el of req.files.postImage) {
        const url = await cloudinary.upload(el.path);

        await PostImage.create(
          { imageUrl: url, postId: post.id },
          { transaction: t }
        );
        fs.unlinkSync(el.path);
      }
    }

    await t.commit();

    res.status(200).json({ post });
  } catch (err) {
    await t.rollback();
    next(err);
  }
};

exports.deleteById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await deletePostById(id);
    if (result !== 1) {
      throw new AppError("Don't have post to delete");
    }
    res.status(200).json({ message: "Delete success" });
  } catch (err) {
    next(err);
  }
};

exports.deletePostImageById = async (req, res, next) => {
  const { id, imageId } = req.params;
  try {
    const result = await deletePostImageById(imageId);
    if (result !== 1) {
      throw new AppError("Don't have post image to delete");
    }
    res.status(200).json({ message: "Delete success" });
  } catch (err) {
    next(err);
  }
};

exports.getPostsByFollowing = async (req, res, next) => {
  try {
    const user = req.user;
    const followingIds = await getAllFollowingIdByUserId(user.id);
    const posts = await getAllPostsByFollowingIds(followingIds);
    res.status(200).json({ posts });
  } catch (err) {
    next(err);
  }
};
