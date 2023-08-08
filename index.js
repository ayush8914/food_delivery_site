require('dotenv').config();
const experss = require('express');
const BodyParser = require('body-parser');
const items_routes = require('./routes/items'); 
const restaurants_routes = require('./routes/restaurant');
const connectDB = require('./db/connect');


const app = experss();
const PORT = process.env.PORT || 5000;


app.use(BodyParser.json());
app.use('/api/items', items_routes  );

app.use('/api/restaurants', restaurants_routes);

app.get('/', (req, res) => { res.send('Hello World') ; res.end();});


const start = async () => {
        try {
            await connectDB(process.env.MONGODB_URI);
            app.listen(PORT, () => { console.log(`Server is running on PORT ${PORT}`) });  
        } catch (error) {
            console.log(error);
        }
};


start();
