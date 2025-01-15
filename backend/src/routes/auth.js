 import express from 'express'
import {login,logout,signup,updateProfile,checkAuth} from '../controllers/auth.controllers.js'
import { protectedRoute } from '../middleware/protectRoute.js';
 const router = express.Router();
const app = express();


 router.post('/signup', signup)
 router.post('/login', login)
 router.post('/logout',logout)
 //first user must be logged in first check that so a protectedRoute is necessary
 router.put("/update-profile",protectedRoute,updateProfile);
 router.get('/check',protectedRoute, checkAuth)
 export default router; 