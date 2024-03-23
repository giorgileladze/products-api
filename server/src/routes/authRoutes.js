import { Router } from "express";
import { login, signup, renewAccessToken } from "../controllers/authController.js";

const router = Router();

router.post('/signup', (req, res, next) => {
    signup(req, res);
})

router.post('/login', (req, res, next) => {
    login(req, res);
})

router.get('get-access-token', (req, res, next) => {
    renewAccessToken(req, res);
})

export default router;