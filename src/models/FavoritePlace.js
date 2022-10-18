module.exports = (sequelize, DataTypes) => {
  const FavoritePlace = sequelize.define(
    'FavoritePlace',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      latitude: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      longitude: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    { underscored: true }
  );

  FavoritePlace.associate = (db) => {
    FavoritePlace.belongsTo(db.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
    });
  };

  return FavoritePlace;
};
