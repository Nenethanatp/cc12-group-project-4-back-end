module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      content: {
        type: DataTypes.STRING,
        allowNull: false
      },
      imageUrl: {
        type: DataTypes.STRING
      }
    },
    { underscored: true }
  );

  Comment.associate = (db) => {
    Comment.belongsTo(db.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false
      }
    });

    Comment.belongsTo(db.Post, {
      foreignKey: {
        name: 'postId',
        allowNull: false
      }
    });

    // Comment.belongsTo;
  };

  return Comment;
};
