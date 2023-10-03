const Item = require('../models/item');
const Cart = require('../models/cart');


//add to cart
const addToCart = async (req, res) => {
    try {
        const { userid, restaurantid, itemid, quantity } = req.body;
        const item = await Item.findById(itemid);
        if (!item) {
            return res.status(404).json({ msg: `No item with id ${itemid}` });
        }
        const cart = await Cart.findOne({ userid, restaurantid });
        if (cart) {
            
            let itemIndex = cart.items.findIndex(p => p.Item == itemid);
            if (itemIndex > -1) {
                
                let productItem = cart.items[itemIndex];
                productItem.quantity = quantity;
                cart.items[itemIndex] = productItem;
            } else {
           
                cart.items.push({ Item: itemid, quantity });
            }
            cart.totalAmount = cart.items.reduce((a, b) => a + b.quantity * item.price, 0);
            await cart.save();
            return res.status(201).json({ cart });
        } else {
            
            const newCart = await Cart.create({
                userid,
                restaurantid,
                items: [{ Item: itemid, quantity }],
                totalAmount: quantity * item.price,
            });
            return res.status(201).json({ newCart });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server Error" });
    }
}


//remove item from cart

const removeItemFromCart = async (req, res) => {
    try {
        const { userid, restaurantid, itemid } = req.body;
        const cart = await Cart.findOne({ userid, restaurantid });
        if (cart) {
            let itemIndex = cart.items.findIndex(p => p.Item == itemid);
            if (itemIndex > -1) {
                let productItem = cart.items[itemIndex];
                cart.totalAmount = cart.totalAmount - productItem.quantity * productItem.price;
                cart.items.splice(itemIndex, 1);
            }
            await cart.save();
            return res.status(201).json({ cart });
        } else {
            return res.status(404).json({ msg: `No cart with id ${cartid}` });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server Error" });
    }
}

//get cart by user id
const getCartByUserId = async (req, res) => {
    
    try {
        const { userid } = req.params;
        const carts = await Cart.find({ userid });
        if (!carts) {
            return res.status(404).json({ msg: `No cart with id ${userid}` });
        }
        res.status(200).json({ carts });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server Error" });
    }
}

module.exports = { addToCart, removeItemFromCart,getCartByUserId };