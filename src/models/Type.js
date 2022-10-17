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

  Type.associate = (db) => {
    Type.hasMany(db.Post, {
      foreignKey: {
        name: 'typeId',
        allowNull: false
      }
    });
  };

  return Type;
};
