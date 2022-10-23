module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      imageUrl: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING
      },
      googleId: {
        type: DataTypes.STRING
      },
      role: {
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user'
      }
    },
    { underscored: true }
  );

  User.associate = (db) => {
    User.hasMany(db.Post, {
      foreignKey: {
        name: 'userId',
        allowNull: false
      }
    });

    User.hasMany(db.FavoritePlace, {
      foreignKey: {
        name: 'userId',
        allowNull: false
      }
    });

    User.hasMany(db.Comment, {
      foreignKey: {
        name: 'userId',
        allowNull: false
      }
    });

    User.hasMany(db.Like, {
      foreignKey: {
        name: 'userId',
        allowNull: false
      }
    });

    User.hasMany(db.Report, {
      foreignKey: {
        name: 'userId',
        allowNull: false
      }
    });

    User.hasMany(db.Subscription, {
      foreignKey: {
        name: 'userId',
        allowNull: false
      }
    });

    User.hasMany(db.Follow, {
      as: 'Follower',
      foreignKey: {
        name: 'followerId'
      }
    });

    User.hasMany(db.Follow, {
      as: 'Following',
      foreignKey: {
        name: 'followingId'
      }
    });
  };

  return User;
};
