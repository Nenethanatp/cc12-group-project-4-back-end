module.exports = (sequelize, DataTypes) => {
  const PostImage = sequelize.define(
    'PostImage',
    {
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    { underscored: true }
  );

  PostImage.associate = (db) => {
    PostImage.belongsTo(db.Post, {
      foreignKey: {
        name: 'postId',
        allowNull: false
      }
    });
  };

  return PostImage;
};
