import express, { Router } from 'express';
import { userLoging,userRegister } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post("/register",userRegister);
userRouter.post("/login",userLoging);

export default userRouter;