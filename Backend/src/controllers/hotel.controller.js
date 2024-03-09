import Hotel from '../models/hotel.model.js';
import uploadOnCloudinary from '../services/cloudinary.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import customError from '../utils/customErrorHandler.js';

export const addNewHotel = asyncHandler(async (req, res, next) => {
    const hotelData = req.body;
    const { imageFiles } = req.files;
    console.log({ hotelData, imageFiles });

    const imagesUploading = imageFiles.map(async (image) => {
        const uploadedFile = await uploadOnCloudinary(image.path);
        return uploadedFile.url;
    });

    const imageUrls = await Promise.all(imagesUploading);
    hotelData.imageUrls = imageUrls;
    hotelData.userId = req.user._id;
    const newHotel = new Hotel(hotelData);
    await newHotel.save();

    res.status(201).json(new ApiResponse(201, newHotel, 'Hotel added successfully'));
});

export const myHotels = asyncHandler(async (req, res, next) => {
    const hotels = await Hotel.find({ userId: req.user._id });
    if (!hotels) {
        return next(new customError(400, 'Hotels not found'));
    }

    res.status(200).json(new ApiResponse(200, hotels, 'Hotel fetched successfully'));
});
