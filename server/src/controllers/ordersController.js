import Order from "../models/Order.js";
import Product from "../models/Product.js"
import { parseUserId } from "../utils/jwtUtils.js";
import { buyProducts } from "./productsController.js";

// create order
export const createOrder = async (req, res) => {
    const products = req.body.products;
    let outOfStore = [];
    
    if(!products || !products.length){
        return res.status(400).json({
            message: "At least 1 product should be added in the cart to create order"
        })
    }

    try {
        const ids = products.map(pr => pr._id);
        const existingProducts = await Product.find({_id: {$in: ids}}).select("_id quantity price");
        let total = 0;

        outOfStore = existingProducts.filter((pr) => {
            const _id = pr._id.toString();
            const quantity = pr.quantity;

            const targetProduct = products.find(el => el._id === _id);

            total += targetProduct.quantity * pr.price; // while checking quantities also count expected total so we avoid axtra loop on products
            return targetProduct.quantity > quantity;
        }).map(el => ({_id: el._id.toString(), quantity: el.quantity}));

        if(outOfStore.length){
            throw new Error();
        }

        const userId = parseUserId(req.headers['access_token']);
        const order = new Order({
            owner: userId,
            createdAt: new Date(),
            products: products,
            total: total
        });

        await order.save();
        await buyProducts(products);

        res.status(200).json({
            order: order._id
        })
    } catch (err){
        res.status(400);

        if(outOfStore.length){
            res.json({
                errors: outOfStore
            });
        }else {
            res.json(err);
        }
    }
}

// get orders
export const getOrders = async (req, res) => {
    const userId = parseUserId(req.headers['access_token']);

    try{
        const ids = await Order.find({owner: userId});

        res.status(200).json(ids)
    } catch (err){
        res.status(500).json(err);
    }
}