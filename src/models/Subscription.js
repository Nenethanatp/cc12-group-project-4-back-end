module.exports = (sequelize, DataTypes) => {
  const Subscription = sequelize.define(
    'Subscription',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      endDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      status: {
        type: DataTypes.ENUM('subscribed', 'expired'),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    { underscored: true }
  );

  Subscription.associate = (db) => {
    Subscription.hasOne(db.Transaction, {
      foreignKey: {
        name: 'subscriptionId',
        allowNull: false,
      },
    });
    Subscription.belongsTo(db.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
    });
    Subscription.belongsTo(db.Package, {
      foreignKey: {
        name: 'packageId',
        allowNull: false,
      },
    });
  };

  return Subscription;
};
