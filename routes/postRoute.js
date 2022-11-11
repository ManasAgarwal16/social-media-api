import express from 'express';
import {
  createPosts,
  deletepost,
  likepost,
  unlikepost,
  comment,
  getposts,
  getsingleposts,
} from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/posts').post(protect, createPosts);
router.route('/posts/:id').get(protect, getsingleposts);
router.route('/all_posts').get(protect, getposts);
router.route('/deletepost/:postid').delete(protect, deletepost);
router.route('/like/:postid').put(protect, likepost);
router.route('/unlike/:postid').put(protect, unlikepost);
router.route('/comment/:postid').put(protect, comment);

export default router;
