import { Router } from "express";
import { createProduct, getProductById, getProducts } from "../controllers/productsController.js";

const router = Router();

// get products
router.get('/', (req, res, next) => {
    getProducts(req, res);
})

// create product
router.post('/', (req, res, next) => {
    createProduct(req, res);
})

// get product by id
router.get('/:productId', (req, res, next) => {
    getProductById(req, res);
})

export default router;