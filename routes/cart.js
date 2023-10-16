const experss = require('express');
const router  = experss.Router();

// const {protect} = require('../middleware/authmiddleware');


const {
    addToCart,
    getCartByUserId,
    removeItemFromCart,
    checkout
} = require('../controllers/cart');



router.route('/addtocart').post(addToCart);

router.route('/getcartitems/:userid').get(getCartByUserId);

router.route('/removeitem').delete(removeItemFromCart);

router.route('/checkout').post(checkout);

module.exports = router;