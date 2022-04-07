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
          },
          dateVisited: {
            type: Date,
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

// add plugin that converts mongoose to json
restaurantSchema.plugin(toJSON);
restaurantSchema.plugin(paginate);

/**
 * @typedef Restaurant
 */
const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
