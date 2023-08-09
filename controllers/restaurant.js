const restuarant = require('../models/restaurant');
const item = require('../models/item'); 

//get all restuarants
const getAllRestaurants = async (req, res) =>{
        const restaurants = await restuarant.find({});
        res.status(200).json({restaurants, nbHits: restaurants.length});
}

//get restuarant by id
const getRestaurantById = async (req, res) =>{
        const { id: restaurantID } = req.params;
        const restaurant = await restuarant.findById(restaurantID);
        if(!restaurant){
                return res.status(404).json({msg: `No restaurant with id ${restaurantID}`});
        }
        res.status(200).json({restaurant});
}

//add restuarant
const addRestaurant = async (req, res) => {
        const newRestaurant = await restuarant.create(req.body);
        res.status(201).json({newRestaurant});
}

//update restuarant
const updateRestaurant = async (req, res) => {
        const { id: restaurantID } = req.params;
        const restaurant = await restuarant.updateOne({_id: restaurantID}, req.body);
        res.status(200).json({restaurant});
}

//delete restuarant
const deleteRestaurant = async (req, res) => {
        const { id: restaurantID } = req.params;
        const restaurantDeleted = await restuarant.findByIdAndDelete(restaurantID);
}

//add item to restuarant
const addItemToRestaurant = async (req, res) => {
        const { id: restaurantID } = req.params;
        const restaurant = await restuarant.findById(restaurantID);
        if(!restaurant){
                return res.status(404).json({msg: `No restaurant with id ${restaurantID}`});
        }
        const newItem = await item.create(req.body);
        restaurant.menu.push(newItem);
        await restaurant.save();
        res.status(201).json({newItem});
}

//remove item from restuarant
const removeItemFromRestaurant = async (req, res) => {
        const { id: restaurantID } = req.params;
        const restaurant = await restuarant.findById(restaurantID);
        if(!restaurant){
                return res.status(404).json({msg: `No restaurant with id ${restaurantID}`});
        }
        const { id: itemID } = req.params;
        const item = await item.findById(itemID);
        if(!item){
                return res.status(404).json({msg: `No item with id ${itemID}`});
        }
        const index = restaurant.menu.findIndex((item) => item._id === itemID);
        if(index !== -1){
                restaurant.menu.splice(index, 1);
                await restaurant.save();
                res.status(200).json({msg: `item with id ${itemID} removed from restaurant with id ${restaurantID}`});
        }else{
                res.status(404).json({msg: `No item with id ${itemID} in restaurant with id ${restaurantID}`});
        }
}

//update item from restuarant
const updateItemFromRestaurant = async (req, res) => {
        const { id: restaurantID } = req.params;
        const restaurant = await restuarant.findById(restaurantID);
        if(!restaurant){
                return res.status(404).json({msg: `No restaurant with id ${restaurantID}`});
        }
        const { id: itemID } = req.params;
        const item = await item.findById(itemID);
        if(!item){
                return res.status(404).json({msg: `No item with id ${itemID}`});
        }
        const index = restaurant.menu.findIndex((item) => item._id === itemID);
        if(index !== -1){
                restaurant.menu.splice(index, 1, req.body);
                await restaurant.save();
                res.status(200).json({msg: `item with id ${itemID} updated from restaurant with id ${restaurantID}`});
        }else{
                res.status(404).json({msg: `No item with id ${itemID} in restaurant with id ${restaurantID}`});
        }
}

//get all items from restuarant
const getAllItemsFromRestaurant = async (req, res) => {
        const { id: restaurantID } = req.params;
        const restaurant = await restuarant.findById(restaurantID).populate('menu');

        if(!restaurant){
                return res.status(404).json({msg: `No restaurant with id ${restaurantID}`});
        }
        res.status(200).json({menu: restaurant.menu, nbHits: restaurant.menu.length});
}

module.exports = { getAllRestaurants, 
        getRestaurantById, 
        addRestaurant, 
        updateRestaurant, 
        deleteRestaurant ,
        addItemToRestaurant,
        getAllItemsFromRestaurant
};
