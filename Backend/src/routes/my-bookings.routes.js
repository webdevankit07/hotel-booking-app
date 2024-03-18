import { Router } from 'express';
import { myBookings } from '../controllers/myBookings.controller.js';
import verifyToken from '../middlewares/auth.middleware.js';

const router = Router();

// private routes...*:
router.route('/').get(verifyToken, myBookings);

export { router as myBookingRoutes };
