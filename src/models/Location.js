module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define(
    'Location',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      latitude: {
        type: DataTypes.STRING,
        allowNull: false
      },
      longitude: DataTypes.STRING,
      allowNull: false
    },
    { underscored: true }
  );

  Location.associate = (db) => {
    Location.hasMany(db.Post, {
      foreignKey: {
        name: 'locationId',
        allowNull: false
      }
    });
  };

  return Location;
};
