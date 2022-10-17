module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define(
    'Payment',
    {
      status: {
        type: DataTypes.ENUM('pending', 'success'),
        defaultValue: 'pending',
        allowNull: false
      }
    },
    { underscored: true }
  );

  Payment.associate = (db) => {
    Payment.belongsTo(db.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false
      }
    });
  };

  return Payment;
};
