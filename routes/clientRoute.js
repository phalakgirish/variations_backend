import express from 'express';
import { forgetPasswordAction, loginAction, newPasswordAction, signUpAction } from '../controllers/clientController.js';
const clientRouter = express.Router();



clientRouter.post("/signup-action" , signUpAction);
clientRouter.post("/login-action" , loginAction);
clientRouter.post("/forgetpass-action" , forgetPasswordAction);
clientRouter.post("/newpass-action" , newPasswordAction);



export default clientRouter;