require('dotenv').config();
const connectDB = require('./db/connect');
const Item = require('./models/item');


const Itemsjson = require('./items2.json');
const start = async () => { 
    try {
        await connectDB(process.env.MONGODB_URI);
        await Item.create(Itemsjson);
        console.log('items created');
    } catch (error) {
        console.log(error);
    }
};  
start();