const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const restaurantValidation = require('../../validations/restaurant.validation');
const restaurantController = require('../../controllers/restaurant.controller');

const router = express.Router();

router
  .route('/')
  .get(auth('getRestaurants'), validate(restaurantValidation.getRestaurants), restaurantController.getRestaurants)
  .post(auth('manageRestaurants'), validate(restaurantValidation.createRestaurant), restaurantController.createRestaurant);

router
  .route('/:restaurantId')
  .get(auth('getRestaurants'), validate(restaurantValidation.getRestaurant), restaurantController.getRestaurant)
  .put(auth('manageRestaurants'), validate(restaurantValidation.updateRestaurant), restaurantController.updateRestaurant)
  .delete(auth('manageRestaurants'), validate(restaurantValidation.deleteRestaurant), restaurantController.deleteRestaurant);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Restaurants
 *   description:
 */

/**
 * @swagger
 * /restaurants:
 *   post:
 *     summary: Create an restaurant
 *     description:
 *     tags: [Restaurants]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Restaurant'
 *       "400":
 *         $ref: '#/components/responses/DuplicateRestaurant'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all restaurants
 *     description:
 *     tags: [Restaurants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   restaurants:
 *                     $ref: '#/components/schemas/Restaurant'
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
