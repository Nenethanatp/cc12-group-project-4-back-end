module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      content: {
        type: DataTypes.STRING,
        allowNull: false
      },
      report: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    },
    { underscored: true, paranoid: true }
  );

  Post.associate = (db) => {
    Post.belongsTo(db.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false
      }
    });

    Post.belongsTo(db.Type, {
      foreignKey: {
        name: 'typeId',
        allowNull: false
      }
    });

    Post.belongsTo(db.Location, {
      foreignKey: {
        name: 'locationId',
        allowNull: false
      }
    });

    Post.hasMany(db.Comment, {
      foreignKey: {
        name: 'postId',
        allowNull: false
      }
    });

    Post.hasMany(db.Like, {
      foreignKey: {
        name: 'postId',
        allowNull: false
      }
    });

    Post.hasMany(db.PostImage, {
      foreignKey: {
        name: 'postId',
        allowNull: false
      }
    });

    Post.hasMany(db.Report, {
      foreignKey: {
        name: 'postId',
        allowNull: false
      }
    });
  };

  return Post;
};
