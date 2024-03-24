import Product from "../models/Product.js";
import { productsErrorHandler } from "../utils/errorHandlers.js";

// get all products
export const getProducts = async (req, res) => {
    const { 
        page = 1,
        count = 20,
    } = req.query;

    try {
        const products = await Product.find().skip((page - 1) * count).limit(count);
        const productsCount = await Product.countDocuments();
        products.forEach(pr => pr.img = req.protocol + '://' + req.get('host') + '/' + pr.img)
        res.status(200).json({
            hasNext: productsCount > count * page,
            count: productsCount,
            products: products
        });
    } catch (err) {
        // make sure status code is not mongoose created error code to avoid INVALID_STATUS_CODE error
        res.status(err.code < 600 ? err.code : 500).json({
            error: err.message || "Something went wrong"
        })
    }
}

// create new product
export const createProduct = async (req, res) => {
    const {
        name,
        description,
        smallDescription,
        price,
        quantity
    } = req.body;
    const img = req.file?.path || '';
    
    try {
        const product = new Product({name, description, smallDescription, price, img, quantity});
        await product.save();

        res.status(200).json({
            product: product._id
        })
    } catch (err) {
            const error = productsErrorHandler(err);
        // make sure status code is not mongoose created error code to avoid INVALID_STATUS_CODE error
        res.status(err.code < 600 ? err.code : 500).json({
            errors: error
        });
    }
}
// get single product by id
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);

        if(!product){
            return res.status(404).json({
                message: 'Product not found'
            });
        }
        product.img = req.protocol + '://' + req.get('host') + '/' + product.img;
        res.status(200).json({product})
        
    } catch (err) {
        res.status(err.code < 600 ? err.code : 500);
        // make sure status code is not mongoose created error code to avoid INVALID_STATUS_CODE error
        res.json({
            error: err.message || "Something went wrong"
        });
    }
}

// discard bought quantities from products
export const buyProducts = async (products) => {
    const bulkUpdateOps = products.map(({ _id, quantity }) => ({
        updateOne: {
            filter: { _id: _id },
            update: { $inc: { quantity: -quantity } } // Subtracting quantity from the existing quantity
        }
    }));

    const result = await Product.bulkWrite(bulkUpdateOps);

    return result;
}

// get products by ids
export const getProductsById = async (req, res) => {
    try {
        const ids = req.body.products;

        if(!ids){
            throw new Error('No product ids provided');
        }
        const products = await Product.find({_id: {$in: ids}});
        products.forEach(pr => pr.img = req.protocol + '://' + req.get('host') + '/' + pr.img)
        res.status(200).json(products);
    } catch (err) {
        res.status(400).json({
            error: err.message
        })
    }
}