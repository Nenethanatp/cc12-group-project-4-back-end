const { Op } = require('sequelize');
const { User, FavoritePlace } = require('../models');

exports.create = async (input) => {
    return await FavoritePlace.create(input);
};

exports.getByUserId = async (userId) => {
    return await FavoritePlace.findAll({
        where: {
            userId: userId
        }
    });
}

exports.getAll = async (query = {}) => {
    return await FavoritePlace.findAll({
        where: query,
        include: { model: User },
    });
}

exports.delete = async (userId, favoriteId) => {
    return await FavoritePlace
        .destroy({
            where: {
                id: favoriteId,
                userId: userId,
            }
        });
}
