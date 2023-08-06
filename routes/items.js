const express = require('express');
const router = express.Router();

const { getAllItems, getAllItemsTesting } = require('../controllers/items');


router.route('/').get( getAllItems  );
router.route('/testing').get( getAllItemsTesting);

module.exports = router;    