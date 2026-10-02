import express from "express";
import { getMessages, sendMessage } from "../controllers/messageController.js";
import isAuthanticated from "../middlewares/isAuthanticated.js";

const router = express.Router();

router.route('/send/:id').post(isAuthanticated, sendMessage);
router.route('/:id').get(isAuthanticated, getMessages);    

export default router;