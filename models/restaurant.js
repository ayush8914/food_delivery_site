const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  deliveryTime: { type: String, required: true, default: "30-40 min" },
  rating: { type: String, required: true, default: "4.5" },
  approxPrice: { type: String, required: true, default: "₹400 for two" },
  offers: { type: Array, required: true, default: [] },
  cuisines: { type: Array, required: true, default: [] },
  bottomContainers: { type: Array, required: true, default: [] },
  goldOff: { type: String, required: true, default: "50% off" },
  proOff: { type: String, required: true, default: "50% off up to 100" },
  discount: { type: String, required: true, default: "50% off" },
  // menu: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
  // reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
});


module.exports = mongoose.model('Restaurant', restaurantSchema);