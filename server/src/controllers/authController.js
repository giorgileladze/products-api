import User from "../models/User.js"
import { userErrorHandler } from "../../utils/errorHandlers.js";

export const login = async (req, res) => {
     const { email, password } = req.body;

     const user = await User.findById('65feb9dd4b86edfaafad026d').exec();

     res.status(200).json(user);
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
          res.status(201).json(user);

     } catch(err) {;
          const errors = userErrorHandler(err);

          res.status(err.status || 400).json({
               errors: errors
          });
     }

 }