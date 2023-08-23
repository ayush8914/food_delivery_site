const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  deliveryTime: {
    type: String,
    required: true,
    default: "40 min",
  },
  rating: {
    type: String,
    default: "3.5",
  },
  approxPrice: {
    type: String,
    required: true,
    default: "₹350 for two",
  },
  offers: [
    {
      text: {
        type: String,
        required: true,
        default: "50% OFF up to 100",
      },
      color: {
        tint: {
          type: String,
          required: true,
          default: "500",
        },
        type: {
          type: String,
          required: true,
          default: "blue",
        }
      }
    }
  ],
  cuisines: [
    {
      type: String,
      required: true,
      default: "Burger",
    }
  ],
  bottomContainers: [
    {
      image: {
        url: {
          type: String,
          default: "https://b.zmtcdn.com/data/o2_assets/0b07ef18234c6fdf9365ad1c274ae0631612687510.png",
        },
        aspect_ratio: {
          type: Number,
          default: 2.66666666667,
        }
      },
      text: {
        type: String,
        default: "Follows all Max Safety measures to ensure your food is safe",
      }
    }
  ],

  goldOff: {
    type: String,
    default: "50% off",
  },
  proOff: {
    type: String,
    default: "50% off up to 100",
  },
  discount: {
    type: String,
    default: "50% off",
  }
  }, {timestamps: true});


module.exports = mongoose.model('Restaurant', restaurantSchema);  