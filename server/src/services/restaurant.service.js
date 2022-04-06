const httpStatus = require('http-status');
const { Restaurant } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create an restaurant
 * @param {Object} restaurantBody
 * @returns {Promise<User>}
 */
const createRestaurant = async (restaurantBody) => {
  return Restaurant.create(restaurantBody);
};

/**
 * Query for restaurants
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @param {string} [filter.q] - For general string seaching of multiple DB fields
 * @returns {Promise<QueryResult>}
 */
const queryRestaurants = async (filter, options) => {
  const regex = new RegExp(filter.q, 'gi');
  const regexFilter = { $or: [{ title: regex }, { description: regex }, { details: regex }] };
  const restaurants = await Restaurant.paginate(regexFilter, options);
  return restaurants;
};

/**
 * Get restaurant by id
 * @param {ObjectId} id
 * @returns {Promise<Restaurant>}
 */
const getRestaurantById = async (id) => {
  return Restaurant.findById(id);
};

/**
 * Update restaurant by id
 * @param {ObjectId} restaurantId
 * @param {Object} updateBody
 * @returns {Promise<Restaurant>}
 */
const updateRestaurantById = async (restaurantId, updateBody) => {
  const restaurant = await getRestaurantById(restaurantId);
  if (!restaurant) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Restaurant not found');
  }
  Object.assign(restaurant, updateBody);
  await restaurant.save();
  return restaurant;
};

/**
 * Delete restaurant by id
 * @param {ObjectId} restaurantId
 * @returns {Promise<Restaurant>}
 */
const deleteRestaurantById = async (restaurantId) => {
  const restaurant = await getRestaurantById(restaurantId);
  if (!restaurant) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Restaurant not found');
  }
  await restaurant.remove();
  return restaurant;
};

module.exports = {
  createRestaurant,
  queryRestaurants,
  getRestaurantById,
  updateRestaurantById,
  deleteRestaurantById,
};
