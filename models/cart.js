const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    restaurantid: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    items: [
        {
            Item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
            quantity: { type: Number, required: true },
        },
    ],

    totalAmount: { type: Number, required: true },
    status: { type: String, default: 'pending', required: true},
    orderDate: { type: Date, default: Date.now },
});


module.exports = mongoose.model('Cart', CartSchema);    