module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      image_url: {
        type: DataTypes.STRING
      },
      emailOrMobile: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
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
      //   as: 'selfcomment',
      foreignKey: {
        name: 'userId',
        allowNull: false
      }
    });

    User.hasMany(db.SavedPlace, {
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
  };

  return User;
};
