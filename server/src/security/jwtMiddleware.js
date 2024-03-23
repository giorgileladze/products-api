import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../utils/jwtUtils.js';

// requier access token for protected routes
export const jwtFilterChain = (req, res, next) => {
    const token = req.headers['access_token'];

    if(!token){
        return res.status(400).json({
            error: 'Access token required for that route'
        });
    }

    jwt.verify(token, JWT_SECRET_KEY, (err, data) => {
        if(err){
            return res.status(403).json({
                error: err
            });
        }
        next(); // if token is provided and its valid -> go to next middlware
    })
}