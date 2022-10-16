module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {}, { underscored: true });

  Like.associate = (db) => {
    Like.belongsTo(db.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false
      }
    });

    Like.belongsTo(db.Post, {
      foreignKey: {
        name: 'postId',
        allowNull: false
      }
    });
  };

  return Like;
};
