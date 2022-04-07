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
          // _id: false,
        },
      ],
    },
    // description: {
    //   type: String,
    //   required: false,
    //   trim: true,
    // },
    // details: {
    //   type: String,
    //   required: false,
    //   trim: true,
    // },
    // tags: {
    //   type: [String],
    // },
    // items: {
    //   type: [{ type: String, required: true, trim: true }],
    //   required: false,
    // },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
restaurantSchema.plugin(toJSON);
restaurantSchema.plugin(paginate);

/**
 * @typedef Restaurant
 */
const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
