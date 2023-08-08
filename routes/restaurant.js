const express = require('express');
const router = express.Router();

const { getAllRestaurants, getRestaurantById, addRestaurant , updateRestaurant, deleteRestaurant, addItemToRestaurant, getAllItemsFromRestaurant} = require('../controllers/restaurant');

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

//add item to restaurant
router.route('/:id/items').post( addItemToRestaurant );

//get all items from restaurant
router.route('/:id/items').get( getAllItemsFromRestaurant );


module.exports = router;    