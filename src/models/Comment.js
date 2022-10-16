module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      content: {
        type: DataTypes.STRING(300),
        allowNull: false
      },
      imageUrl: {
        type: DataTypes.STRING
      }
    },
    { underscored: true }
  );

  return Comment;
};
