import express from 'express';
const router = express.Router();
import {
  authUser,
  registerUser,
  registerAdmin,
  registerOfficer,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

router.route('/').post(registerUser).get(protect, getUsers);
router.route('/register-admin').post(protect, admin, registerAdmin);
router.route('/register-officer').post(protect, admin, registerOfficer);
router.post('/login', authUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route('/:id')
  .get(protect, getUserById)
  .delete(protect, admin, deleteUser)
  .put(protect, admin, updateUser);

export default router;
