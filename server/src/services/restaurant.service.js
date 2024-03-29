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

/**
 * Submit review to restaurant by id
 * @param {ObjectId} restaurantId
 * @returns {Promise<Review>}
 */
const submitReview = async (id, review) => {
  const restaurant = await getRestaurantById(id);
  if (!restaurant) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Restaurant not found');
  }
  Object.assign(restaurant, { reviews: [review, ...restaurant.reviews] });
  await restaurant.save();
  return restaurant;
};

/**
 * Update review to restaurant by restaurant id and review id
 * @param {ObjectId} restaurantId
 * @param {ObjectId} reviewId
 * @returns {Promise<Review>}
 */
const updateReview = async (restaurantId, reviewId, payload) => {
  const restaurant = await getRestaurantById(restaurantId);
  if (!restaurant) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Restaurant not found');
  }
  // there might be a more mongoose-ish way to do this
  if (restaurant.reviews.filter((rev) => rev.id === reviewId).length < 1) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review not found');
  }
  let modifiedReviews = [];
  modifiedReviews = restaurant.reviews.map((rev) => {
    if (rev._id.toString() === reviewId) {
      return {
        ...rev._doc,
        ...payload,
      };
    }
    return rev;
  });
  Object.assign(restaurant, { reviews: modifiedReviews });
  await restaurant.save();
  return restaurant;
};

/**
 * Delete review from restaurant
 * @param {ObjectId} restaurantId
 * @param {ObjectId} reviewId
 * @returns {Promise<Restaurant>}
 */
const deleteReview = async (restaurantId, reviewId) => {
  const restaurant = await getRestaurantById(restaurantId);
  if (!restaurant) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Restaurant not found');
  }
  // there might be a more mongoose-ish way to do this
  if (restaurant.reviews.filter((rev) => rev.id === reviewId).length < 1) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review not found');
  }
  await restaurant.reviews.pull({ _id: reviewId });
  await restaurant.save();
  return restaurant;
};

module.exports = {
  createRestaurant,
  queryRestaurants,
  getRestaurantById,
  updateRestaurantById,
  deleteRestaurantById,
  submitReview,
  updateReview,
  deleteReview,
};
