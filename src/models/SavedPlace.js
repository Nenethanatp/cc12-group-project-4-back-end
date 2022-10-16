module.exports = (sequelize, DataTypes) => {
  const SavedPlace = sequelize.define(
    'SavePlace',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      latitude: {
        type: DataTypes.STRING,
        allowNull: false
      },
      longitude: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    { underscored: true }
  );

  return SavedPlace;
};
