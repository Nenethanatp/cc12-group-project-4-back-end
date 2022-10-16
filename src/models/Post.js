module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      content: {
        type: DataTypes.STRING(300),
        allowNull: false
      },
      report: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    { underscored: true }
  );

  return Post;
};
