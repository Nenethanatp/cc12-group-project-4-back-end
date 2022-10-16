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
};
