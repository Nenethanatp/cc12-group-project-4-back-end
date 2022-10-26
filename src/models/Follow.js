module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define('Follow', {}, { underscored: true });

  Follow.associate = (db) => {
    Follow.belongsTo(db.User, {
      as: 'Follower',
      foreignKey: {
        name: 'followerId'
      }
    });

    Follow.belongsTo(db.User, {
      as: 'Following',
      foreignKey: {
        name: 'followingId'
      }
    });
  };

  return Follow;
};
