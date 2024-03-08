import { Router } from 'express';
import { addNewHotel } from '../controllers/hotel.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
import verifyToken from '../middlewares/auth.middleware.js';
import validate from '../middlewares/validator.middleware.js';
import { hotelSChema } from '../validators/hotel.validator.js';
const router = Router();

router
    .route('/add-hotel')
    .post(verifyToken, upload.fields([{ name: 'imageFiles', maxCount: 6 }]), validate(hotelSChema), addNewHotel);
export { router as hotelRoutes };
