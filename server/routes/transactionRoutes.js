import express from 'express';
import {
  issueBook,
  returnBook,
  getTransactions,
  getDashboardStats,
} from '../controllers/transactionController.js';

const router = express.Router();

router.get('/', getTransactions);
router.get('/dashboard/stats', getDashboardStats);
router.post('/issue', issueBook);
router.put('/:id/return', returnBook);

export default router;
