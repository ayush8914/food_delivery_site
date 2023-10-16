const Item = require('../models/item');
const Cart = require('../models/cart');


//add to cart
const addToCart = async (req, res) => {
    try {
        const { userid, itemid, quantity } = req.body;
        const item = await Item.findById(itemid);
        if (!item) {
            return res.status(404).json({ msg: `No item with id ${itemid}` });
        }

        const cart = await Cart.findOne({ userid });

        if (cart) {
              let itemIndex = cart.items.findIndex(p => p.Item._id == itemid);

            if (itemIndex > -1) {

                let productItem = cart.items[itemIndex];
                productItem.quantity = 1 + productItem.quantity;
                cart.items[itemIndex] = productItem;
                cart.totalAmount = cart.totalAmount + item.price;
            } else {
           
                cart.items.push({ Item: item, quantity });
                cart.totalAmount = cart.totalAmount +  quantity * item.price;
            }
        
            await cart.save();
            return res.status(201).json({ cart });
        } else {
            
            const newCart = await Cart.create({
                userid,
                items: [{ Item: item, quantity }],
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
        const { userid , itemid } = req.body;
        const cart = await Cart.findOne({ userid });
        if (cart) {
            let itemIndex = cart.items.findIndex(p => p.Item._id == itemid);
            if (itemIndex > -1) {
                let productItem = cart.items[itemIndex];
                if(productItem.quantity == 1){
                cart.totalAmount =cart.totalAmount - (productItem.quantity * productItem.Item.price) ;
                cart.items.splice(itemIndex, 1);

                }
                else{

                    if(productItem.quantity != 0 ){
                    productItem.quantity = productItem.quantity - 1;
                    cart.items[itemIndex] = productItem;
                    cart.totalAmount =cart.totalAmount - (1* productItem.Item.price) || 0;
                    }
                    else{
                        cart.items[itemIndex] = productItem;
                        cart.totalAmount =0;
                    }
                }
            }
            await cart.save();
            return res.status(201).json({ cart });
        } else {
            return res.status(404).json({ msg: `No cart with id ${cartid}` });
        }
    } catch (error) {
        console.log(error);
        res.status(200).json({ msg: "Not remove from the cart please try again" });
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


//update cart status
const checkout = async (req, res) => {
    try {
        const { userid } = req.body;
        //find and delete cart

        const cart = await Cart.findOneAndRemove({ userid });

        if (!cart) {
            return res.status(404).json({ msg: `No cart with id ${cartid}` });
        }
        res.status(200).json({ cart });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server Error" });
    }
}



module.exports = { addToCart, removeItemFromCart,getCartByUserId,checkout };
