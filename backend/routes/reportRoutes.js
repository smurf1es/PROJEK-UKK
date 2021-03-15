import express from 'express';
import {
  createComment,
  createReport,
  deleteComment,
  deleteReport,
  getReportById,
  getReports,
  updateReport,
  setReportToBeingProcessed,
  setReportToDone,
} from '../controllers/reportController.js';
const router = express.Router();
import { admin, officer, protect } from '../middleware/authMiddleware.js';

router.route('/').get(protect, getReports).post(protect, createReport);
router
  .route('/:id')
  .get(protect, getReportById)
  .put(protect, updateReport)
  .delete(protect, deleteReport);
router
  .route('/verify/:id')
  .put(protect, admin || officer, setReportToBeingProcessed);
router.route('/clear/:id').put(protect, admin || officer, setReportToDone);
router.route('/comment/:id').post(protect, createComment);
router.route('/comment/:id/:comment_id').delete(protect, deleteComment);

export default router;
