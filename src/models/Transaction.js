module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    'Transaction',
    {
      status: {
        type: DataTypes.ENUM('pending', 'success'),
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
      omiseId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    { underscored: true }
  );
  Transaction.associate = (db) => {
    Transaction.belongsTo(db.Subscription, {
      foreignKey: {
        name: 'subscriptionId',
        allowNull: false,
      },
    });
  };
  return Transaction;
};
