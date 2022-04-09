const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const restaurantSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    reviews: {
      type: [
        {
          rating: {
            type: Number,
            required: true,
          },
          comment: {
            type: String,
            required: true,
            trim: true,
            maxlength: 250,
          },
          dateVisited: {
            type: Date,
            required: true,
          },
          reviewDate: {
            type: Date,
            default: Date.now,
            required: true,
          },
        },
      ],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

restaurantSchema.virtual('reviewAvg').get(function () {
  const reviewTotal = this.reviews.reduce((sum, cur) => sum + cur.rating, 0);
  return reviewTotal / this.reviews.length;
});

restaurantSchema.virtual('reviewMax').get(function () {
  if (!this.reviews.length) return null;
  const max = this.reviews.reduce((a, b) => (a.rating > b.rating ? a : b), 0).rating;
  return max;
});

restaurantSchema.virtual('reviewMin').get(function () {
  if (!this.reviews.length) return null;
  const min = this.reviews.reduce((a, b) => (a.rating < b.rating ? a : b), 0).rating;
  return min;
});

restaurantSchema.virtual('reviewCount').get(function () {
  return this.reviews.length || 0;
});

// add plugin that converts mongoose to json
restaurantSchema.plugin(toJSON);
restaurantSchema.plugin(paginate);

/**
 * @typedef Restaurant
 */
const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
