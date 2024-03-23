import User from "../models/User.js"
import { userErrorHandler } from "../../utils/errorHandlers.js";
import { getAccessToken, getRefreshToken } from "../../utils/jwtUtils.js";
import bcrypt from 'bcrypt';

export const login = async (req, res) => {
     const { email, password } = req.body;
     try {
          const user = await User.findOne({ email }).exec();

          if(!user){
               throw new Error('User does not exists');
          }

          const isValid = await bcrypt.compare(password, user.password);
          const id = user._id;
          if(!isValid) {
               throw new Error('Invalid password');
          }

          const access = getAccessToken(id);
          const refresh = getRefreshToken(id);

          res.setHeader('access_token', access);
          res.setHeader('refresh_token', refresh);

          res.status(200).json(user);
     } catch (err) {
          res.status(400).json({
               error: err.message
          })
     }
}

export const signup = async (req, res) => {
     const { username, email, password, repeatPassword } = req.body;

     if(repeatPassword !== password) {
          return res.status(400).json({
               error: 'Password does not match.'
          });
     }

     try {
          const user = new User({username, email, password});
          await user.save();

          const id = user._id;
          const access = getAccessToken(id);
          const refresh = getRefreshToken(id);

          res.setHeader('access_token', access);
          res.setHeader('refresh_token', refresh);

          res.status(201).json({ id });

     } catch(err) {
          const errors = userErrorHandler(err);

          res.status(err.status || 400).json({
               errors: errors
          });
     }

 }

export const renewAccessToken = (req, res) => {

} 