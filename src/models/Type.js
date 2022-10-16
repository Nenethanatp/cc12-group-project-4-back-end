module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define(
    'Type',
    {
      type: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    { underscored: true }
  );

  return Type;
};
