const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    cuisine: { type: String, required: true },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String },
      zipCode: { type: String, required: true },
    },
    imageUrl: { type: String },
    // menu: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
    // reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],

  });
  

module.exports = mongoose.model('Restaurant', restaurantSchema);