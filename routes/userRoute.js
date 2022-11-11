import express from 'express';
import {
  authUser,
  registerUser,
  follow,
  unfollow,
  getUserProfile,
} from '../controllers/userController.js';

import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/register').post(registerUser);

router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile);

router.route('/follow/:id').put(protect, follow);
router.route('/unfollow/:id').put(protect, unfollow);

export default router;
