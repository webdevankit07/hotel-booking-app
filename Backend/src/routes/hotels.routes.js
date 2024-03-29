import { Router } from 'express';
import {
    addNewHotel,
    bookingPaymentIntent,
    bookings,
    getAllHotels,
    getHotelDetail,
    getHotels,
    myHotelDetail,
    myHotels,
    updateHotel,
} from '../controllers/hotel.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
import verifyToken from '../middlewares/auth.middleware.js';
import validate from '../middlewares/validator.middleware.js';
import { hotelSChema } from '../validators/hotel.validator.js';

const router = Router();

//Public routes..*:
router.route('/search').get(getHotels);
router.route('/hotel/:id').get(getHotelDetail);
router.route('/getAllHotels').get(getAllHotels);

// Private Routes....*:
router.route('/').get(verifyToken, myHotels);
router.route('/:id').get(verifyToken, myHotelDetail);
router
    .route('/add-hotel')
    .post(verifyToken, upload.fields([{ name: 'imageFiles', maxCount: 6 }]), validate(hotelSChema), addNewHotel);
router
    .route('/update-hotel/:id')
    .put(verifyToken, upload.fields([{ name: 'imageFiles', maxCount: 6 }]), validate(hotelSChema), updateHotel);
router.route('/:hotelId/bookings/payment-intent').post(verifyToken, bookingPaymentIntent);
router.route('/:hotelId/bookings').post(verifyToken, bookings);

export { router as hotelRoutes };
