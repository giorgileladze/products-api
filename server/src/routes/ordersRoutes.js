import { Router } from "express";
import { createOrder, getOrders } from "../controllers/ordersController.js";

const router = Router();

// get user orders ids
router.get('/', (req, res, next) => {
    getOrders(req, res);
})

// create order
router.post('/', (req, res, next) => {
    createOrder(req, res);
})


export default router;