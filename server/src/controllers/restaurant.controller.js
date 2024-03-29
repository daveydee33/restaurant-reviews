const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { restaurantService } = require('../services');

const createRestaurant = catchAsync(async (req, res) => {
  const restaurant = await restaurantService.createRestaurant(req.body);
  res.status(httpStatus.CREATED).send(restaurant);
});

const getRestaurants = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['q']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await restaurantService.queryRestaurants(filter, options);
  res.send(result);
});

const getRestaurant = catchAsync(async (req, res) => {
  const restaurant = await restaurantService.getRestaurantById(req.params.restaurantId);
  if (!restaurant) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Restaurant not found');
  }
  res.send(restaurant);
});

const updateRestaurant = catchAsync(async (req, res) => {
  const restaurant = await restaurantService.updateRestaurantById(req.params.restaurantId, req.body);
  res.send(restaurant);
});

const deleteRestaurant = catchAsync(async (req, res) => {
  await restaurantService.deleteRestaurantById(req.params.restaurantId);
  res.status(httpStatus.NO_CONTENT).send();
});

const submitReview = catchAsync(async (req, res) => {
  const review = await restaurantService.submitReview(req.params.restaurantId, req.body);
  res.send(review);
});

const updateReview = catchAsync(async (req, res) => {
  const review = await restaurantService.updateReview(req.params.restaurantId, req.params.reviewId, req.body);
  res.send(review);
});

const deleteReview = catchAsync(async (req, res) => {
  const { restaurantId, reviewId } = req.params;
  const restaurant = await restaurantService.deleteReview(restaurantId, reviewId);
  res.send(restaurant);
});

module.exports = {
  createRestaurant,
  getRestaurants,
  getRestaurant,
  updateRestaurant,
  deleteRestaurant,
  submitReview,
  updateReview,
  deleteReview,
};
