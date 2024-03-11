import Hotel from '../models/hotel.model.js';
import uploadOnCloudinary from '../services/cloudinary.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import customError from '../utils/customErrorHandler.js';

export const getHotels = asyncHandler(async (req, res, next) => {
    const limit = 5;
    const pageNumber = parseInt(req.query.page ? req.query.page.toString() : '1');
    const skip = (pageNumber - 1) * limit;

    const hotels = await Hotel.find().skip(skip).limit(limit);
    const total = await Hotel.countDocuments();

    res.status(200).json(
        new ApiResponse(
            200,
            { data: hotels, pagination: { total, pageNo: pageNumber, pages: Math.ceil(total / limit) } },
            'success'
        )
    );
});

export const addNewHotel = asyncHandler(async (req, res, next) => {
    const hotelData = req.body;
    const { imageFiles } = req.files;

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

export const myHotelDetail = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const hotel = await Hotel.findOne({ _id: id, userId: req.user._id });
    if (!hotel) {
        return next(new customError(400, 'Error fetching hotel details'));
    }

    res.status(200).json(new ApiResponse(200, hotel, 'Hotel details fetched.'));
});

export const updateHotel = asyncHandler(async (req, res, next) => {
    const updatedHotel = req.body;
    const { imageFiles } = req.files;

    const hotel = await Hotel.findOneAndUpdate({ _id: req.params.id, userId: req.user._id }, updatedHotel, {
        new: true,
    });
    if (!hotel) {
        return next(new customError(404, 'Hotel not found'));
    }

    if (imageFiles) {
        const imagesUploading = imageFiles.map(async (image) => {
            const uploadedFile = await uploadOnCloudinary(image.path);
            return uploadedFile.url;
        });
        const updatedImageUrls = await Promise.all(imagesUploading);
        const images = [...updatedImageUrls, ...(updatedHotel.imageUrls || [])];
        hotel.imageUrls = images;
        await hotel.save();
    }

    res.status(201).json(new ApiResponse(201, hotel, 'Hotel updated'));
});
