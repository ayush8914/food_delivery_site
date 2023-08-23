const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    restaurantid: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    name: { type: String, required: true },
    price: { type: Number, required:[ true, "price is required"]},
    image: {type: String, required: true},
    description: { type: String, required: true },
    category: { type: String, required: true },
    featured: { type: Boolean, default: false },
    rating : { type: Number, required: false ,default: 0},
    createdAt:{ type: Date, default: Date.now}
    
});

module.exports = mongoose.model('Item', ItemSchema);























