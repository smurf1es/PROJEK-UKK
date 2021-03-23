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
  setReportToBeingProcessedAsOfficer,
  setReportToDoneAsOfficer,
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
  .route('/admin/verify/:id')
  .put(protect, admin, setReportToBeingProcessed);
router.route('/admin/clear/:id').put(protect, admin, setReportToDone);
router
  .route('/officer/verify/:id')
  .put(protect, officer, setReportToBeingProcessedAsOfficer);
router
  .route('/officer/clear/:id')
  .put(protect, officer, setReportToDoneAsOfficer);
router.route('/comment/:id').post(protect, createComment);
router.route('/comment/:id/:comment_id').delete(protect, deleteComment);

export default router;
