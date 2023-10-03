const experss = require('express');
const router  = experss.Router();

// const {protect} = require('../middleware/authmiddleware');


const {
    addToCart,
    getCartByUserId,
    removeItemFromCart,
} = require('../controllers/cart');



router.route('/addtocart').post(addToCart);

router.route('/getcartitems/:userid').get(getCartByUserId);

router.route('/removeitem').delete(removeItemFromCart);

module.exports = router;