const restuarant = require('../models/restaurant');
const item = require('../models/item'); 
const {addItem, updateItem, deleteItem, getAllItems,deleteAllItems} = require('../controllers/items');

//get all restuarants
const getAllRestaurants = async (req, res) =>{
        const restaurants = await restuarant.find({});
        res.status(200).json({restaurants, nbHits: restaurants.length});
}
//get all restuarants by owner id
const getAllRestaurantsByOwner = async (req, res) =>{
        // const { id: ownerID } = req.params;
        const restaurants = await restuarant.find({ownerId: req.params.id});
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

//delete all restuarants
const deleteAllRestaurants = async (req, res) => {
        const restaurantsDeleted = await restuarant.deleteMany();
        res.status(200).json({restaurantsDeleted});
}

//add item to restuarant using item controller add item
const addItemToRestaurant = async (req, res) => {
        const { id: restaurantID } = req.params;
        const restaurant = await restuarant.findById(restaurantID);
        if(!restaurant){
                return res.status(404).json({msg: `No restaurant with id ${restaurantID}`});
        }
        req.body.restaurantid = restaurantID;
        const newItem = await addItem(req, res);
       
}

//remove item from restuarant usiing item controller delete item
const removeItemFromRestaurant = async (req, res) => {
        const { id: restaurantID } = req.params;
        const restaurant = await restuarant.findById(restaurantID);
        if(!restaurant){
                return res.status(404).json({msg: `No restaurant with id ${restaurantID}`});
        }
        const itemID  = req.params.itemid;
        
        const item1 = await item.findByIdAndDelete(itemID);
        if(!item1){
                return res.status(404).json({msg: `No item with id ${itemID}`});
        }
        res.status(200).json({msg: `item with id ${itemID} deleted`});
}

//update item from restuarant using item controller update item
const updateItemFromRestaurant = async (req, res) => {
        const { id: restaurantID } = req.params;
        const restaurant = await restuarant.findById(restaurantID);
        if(!restaurant){
                return res.status(404).json({msg: `No restaurant with id ${restaurantID}`});
        }
        const itemID  = req.params.itemid;
        const item1 = await item.findById(itemID);
        if(!item1){
                return res.status(404).json({msg: `No item with id ${itemID}`});
        }
        const itemUpdated = await updateItem(req, res);
}

//get all items from restuarant using item controller get all items
const getAllItemsFromRestaurant = async (req, res) => {
        const { id: restaurantID } = req.params;
        const restaurant = await restuarant.findById(restaurantID);
        if(!restaurant){
                return res.status(404).json({msg: `No restaurant with id ${restaurantID}`});
        }
        req.query.restaurantid = restaurantID;
        const items = await getAllItems(req, res);
}

//delete all items from restuarant using item controller delete all items
const deleteAllItemsFromRestaurant = async (req, res) => {
        const { id: restaurantID } = req.params;
        const restaurant = await restuarant.findById(restaurantID);
        if(!restaurant){
                return res.status(404).json({msg: `No restaurant with id ${restaurantID}`});
        }
        req.query.restaurantid = restaurantID;
        const itemsDeleted = await deleteAllItems(req, res);
}

//get item by id from restuarant using item controller get item by id
const getItem = async (req, res) => {
      const restuarantID = req.params.id;
        const itemID = req.params.itemid;
        const restaurant = await restuarant.findById(restuarantID);
        if(!restaurant){
                return res.status(404).json({msg: `No restaurant with id ${restuarantID}`});
        }

        const items = await item.findById(itemID);
        if(!items){
                return res.status(404).json({msg: `No item with id ${itemID}`});
        }
        res.status(200).json({items});
}
      

module.exports = { getAllRestaurants, 
        getRestaurantById, 
        addRestaurant, 
        updateRestaurant, 
        deleteRestaurant ,
        addItemToRestaurant,
        getAllItemsFromRestaurant,
        deleteAllRestaurants,
        removeItemFromRestaurant,
        updateItemFromRestaurant,
        deleteAllItemsFromRestaurant,
        getAllRestaurantsByOwner,
        getItem
};
