module.exports = (sequelize, DataTypes) => {
  const SavedPlace = sequelize.define(
    'SavedPlace',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      latitude: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      longitude: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }
    },
    { underscored: true }
  );

  SavedPlace.associate = (db) => {
    SavedPlace.belongsTo(db.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false
      }
    });
  };

  return SavedPlace;
};
