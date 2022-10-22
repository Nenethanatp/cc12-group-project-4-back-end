module.exports = (sequelize, DataTypes) => {
  const ChatUser = sequelize.define(
    'ChatUser',
    {
      user1: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      user2: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      room: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }
    },
    {
      underscored: true
    }
  );
  return ChatUser;
};
