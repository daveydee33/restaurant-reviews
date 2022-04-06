const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createRestaurant = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    // description: Joi.string().allow(''),
    // details: Joi.string().allow(''),
    // tags: Joi.array().items(Joi.string().allow('')),
    // items: Joi.array().items(Joi.string()).unique(),
  }),
};

const getRestaurants = {
  query: Joi.object().keys({
    title: Joi.string(),
    description: Joi.string(),
    details: Joi.string(),
    sortBy: Joi.string(),
    q: Joi.string().allow(''),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getRestaurant = {
  params: Joi.object().keys({
    restaurantId: Joi.string().required().custom(objectId),
  }),
};

const updateRestaurant = {
  params: Joi.object().keys({
    restaurantId: Joi.string().required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      // description: Joi.string().allow(''),
      // details: Joi.string().allow(''),
      // tags: Joi.array().items(Joi.string().allow('')),
      // items: Joi.array().items(Joi.string()).unique(),
    })
    .min(1),
};

const deleteRestaurant = {
  params: Joi.object().keys({
    restaurantId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createRestaurant,
  getRestaurants,
  getRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
