const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  restaurantid: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  items: [
    {
      Item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
      quantity: { type: Number, required: true },
    },
 ],

  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'processing','completed'], default: 'pending' },
  orderDate: { type: Date, default: Date.now},
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
