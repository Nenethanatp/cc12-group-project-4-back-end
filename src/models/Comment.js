module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      content: {
        type: DataTypes.STRING
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

    Comment.hasMany(db.Comment, {
      foreignKey: {
        name: 'commentId'
      }
    });
    Comment.belongsTo(db.Comment, {
      foreignKey: {
        name: 'commentId'
      }
    });
  };

  return Comment;
};
