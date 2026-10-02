import express from "express";
import {getAuthUser, getOtherUser, Login, Logout, register} from "../controllers/userController.js";
import isAuthanticated from "../middlewares/isAuthanticated.js";

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(Login);
router.route('/logout').get(Logout);
router.route('/me').get(isAuthanticated, getAuthUser);
router.route('/getOtherUser').get(isAuthanticated,getOtherUser)
 
export default router;