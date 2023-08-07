const express = require('express');
const router = express.Router();

const { getAllItems, getAllItemsTesting, addItem, addAllItems, updateItem, deleteItem} = require('../controllers/items');

//get items
router.route('/').get( getAllItems  );

//delete item
router.route('/:id').delete( deleteItem );

//add item
router.route('/').post( addItem );

//add all items
router.route('/').post( addAllItems );

//update item
router.route('/:id').patch( updateItem );

//testing
router.route('/testing').get( getAllItemsTesting);

module.exports = router;    