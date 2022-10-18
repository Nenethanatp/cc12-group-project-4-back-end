module.exports = (sequelize, DataTypes) => {
  const Package = sequelize.define(
    'Package',
    {
      type: {
        type: DataTypes.ENUM('monthly', 'annually'),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    { underscored: true }
  );
  Package.associate = (db) => {
    Package.hasMany(db.Subscription, {
      foreignKey: {
        name: 'packageId',
        allowNull: false,
      },
    });
  };

  return Package;
};
