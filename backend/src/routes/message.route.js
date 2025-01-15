import express from 'express'
import { protectedRoute } from '../middleware/protectRoute.js';
import { getUsersSide,getMessages,sendMessage } from '../controllers/message.controller.js';

const msgRouter = express.Router();

msgRouter.get('/users',protectedRoute, getUsersSide);
msgRouter.get('/:id', protectedRoute,getMessages)
msgRouter.post('/send/:id', protectedRoute,sendMessage)
export default msgRouter;