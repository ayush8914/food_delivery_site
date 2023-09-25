const express = require('express');
const router = express.Router();

const { getAllRestaurants,
     getRestaurantById, 
     addRestaurant , 
     updateRestaurant, 
     deleteRestaurant, 
     addItemToRestaurant, 
     getAllItemsFromRestaurant,
     deleteAllRestaurants,
     removeItemFromRestaurant,
     updateItemFromRestaurant,
     deleteAllItemsFromRestaurant,
     getAllRestaurantsByOwner,
     getItem
    } = require('../controllers/restaurant');

//get all restaurants by owner
router.route('/owner/:id').get( getAllRestaurantsByOwner );

//get all restaurants
router.route('/').get( getAllRestaurants);

//get restaurant by id
router.route('/:id').get( getRestaurantById );

//add restaurant
router.route('/').post( addRestaurant );

//update restaurant
router.route('/:id').patch( updateRestaurant );

//delete restaurant
router.route('/:id').delete( deleteRestaurant );

//delete all restaurants
router.route('/').delete( deleteAllRestaurants );

//add item to restaurant
router.route('/:id/items').post( addItemToRestaurant );

//remove item from restaurant
router.route('/:id/items/:itemid').delete( removeItemFromRestaurant );

//update item from restaurant
router.route('/:id/items/:itemid').patch( updateItemFromRestaurant );

//get item from restaurant
router.route('/:id/items/:itemid').get( getItem );

//get all items from restaurant
router.route('/:id/items').get( getAllItemsFromRestaurant );

//delete all items from restaurant
router.route('/:id/items').delete( deleteAllItemsFromRestaurant );

module.exports = router;    


