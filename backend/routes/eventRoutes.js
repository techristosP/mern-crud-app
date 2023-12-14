import express from 'express';
import {
    createEvent,
    updateEvent,
    deleteEvent,
    getEvents
} from '../controllers/eventController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/create').post(protect, createEvent);
router.route('/update').put(protect, updateEvent);
router.route('/delete').delete(protect, deleteEvent);
router.route('/').get(protect, getEvents);

export default router;