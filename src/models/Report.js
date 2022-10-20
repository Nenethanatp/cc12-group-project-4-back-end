module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {}, { underscored: true });

  Report.associate = (db) => {
    Report.belongsTo(db.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false
      }
    });

    Report.belongsTo(db.Post, {
      foreignKey: {
        name: 'postId',
        allowNull: false
      }
    });
  };

  return Report;
};
