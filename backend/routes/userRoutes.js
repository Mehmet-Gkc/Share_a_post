import express from "express";
import * as user from "../controller/userController.js"
import { authMiddleware } from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.post('/register', user.createUserController);
userRouter.post('/login', user.loginUserController);
userRouter.post('/logout', user.logoutUserController)
userRouter.get('/getUsers', authMiddleware, user.getAllUsersController)

export default userRouter;