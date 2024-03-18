import Hotel from '../models/hotel.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';

export const myBookings = asyncHandler(async (req, res, next) => {
    const hotels = await Hotel.find({ bookings: { $elemMatch: { userId: req.user._id } } });

    const results = hotels.map((hotel) => {
        const userBookings = hotel.bookings.filter((booking) => booking.userId === req.user.id);
        const hotelWithUserBookings = { ...hotel.toObject(), bookings: userBookings };
        return hotelWithUserBookings;
    });

    res.status(200).json(new ApiResponse(200, results));
});
