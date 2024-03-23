import { Router } from "express";
import { login, signup, renewAccessToken } from "../controllers/authController.js";

const router = Router();

// create new user
router.post('/signup', (req, res, next) => {
    signup(req, res);
})

// login existing user
router.post('/login', (req, res, next) => {
    login(req, res);
})

// get new access token from refresh token
router.get('/get-access-token', (req, res, next) => {
    renewAccessToken(req, res);
})

export default router;