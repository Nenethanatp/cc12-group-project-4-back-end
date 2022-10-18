const fs = require('fs')

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
        { latitude, longitude, name: "test" },
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
        fs.unlinkSync(el.path)
      }
    }

    const post = await Post.findOne({
      where: {
        id: newPost.id,
      },
      include: [
        { model: User, attributes: { exclude: ["password", "googleId"] } },
        PostImage,
        Location,
        Type,
      ],
      transaction: t,
    });

    await t.commit();

    res.status(200).json({ post });
  } catch (err) {
    await t.rollback();
    next(err); 
  }
};
