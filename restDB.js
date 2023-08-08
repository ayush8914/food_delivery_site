require('dotenv').config();
const connectDB = require('./db/connect');
const Item = require('./models/restaurant');


const restaurantjson = require('./restaurant.json');
const start = async () => { 
    try {
        await connectDB(process.env.MONGODB_URI);
        await Item.create(restaurantjson);
        console.log('restaurants created');
    } catch (error) {
        console.log(error);
    }
};  
start();