import Hotel from '../models/hotel.model.js';
import uploadOnCloudinary from '../services/cloudinary.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import customError from '../utils/customErrorHandler.js';
import { constructSearchQuery } from '../utils/utils.js';
import Stripe from 'stripe';
import { STRIPE_API_KEY } from '../conf/index.js';

const stripe = new Stripe(STRIPE_API_KEY);

export const getHotels = asyncHandler(async (req, res, next) => {
    const query = await constructSearchQuery(req.query);

    let sortOptions = {};
    switch (req.query.sortOption) {
        case 'starRating':
            sortOptions = { starRating: -1 };
            break;
        case 'pricePerNightAsc':
            sortOptions = { pricePerNight: 1 };
            break;
        case 'pricePerNightDesc':
            sortOptions = { pricePerNight: -1 };
            break;
    }

    const limit = 5;
    const pageNumber = parseInt(req.query.page ? req.query.page.toString() : '1');
    const skip = (pageNumber - 1) * limit;

    const hotels = await Hotel.find(query).sort(sortOptions).skip(skip).limit(limit);
    const total = await Hotel.countDocuments(query);

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

export const getAllHotels = asyncHandler(async (req, res, next) => {
    const hotels = await Hotel.find();
    if (!hotels) {
        return next(new customError(400, 'Hotels not found'));
    }

    res.status(200).json(new ApiResponse(200, hotels));
});

export const getHotelDetail = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const hotel = await Hotel.findById(id);
    if (!hotel) {
        return next(new customError(400, 'Error fetching hotel details'));
    }

    res.status(200).json(new ApiResponse(200, hotel, 'Hotel details fetched.'));
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

export const bookingPaymentIntent = asyncHandler(async (req, res, next) => {
    const { numberOfNights } = req.body;
    const { hotelId } = req.params;
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
        return next(new customError(400, 'Hotel not found'));
    }

    const totalCost = hotel.pricePerNight * parseInt(numberOfNights);
    const paymentIntent = await stripe.paymentIntents.create({
        amount: totalCost * 100,
        currency: 'INR',
        description: 'for hotel-booking project',
        shipping: {
            name: 'Random singh',
            address: {
                line1: '510 Townsend St',
                postal_code: '98140',
                city: 'San Francisco',
                state: 'CA',
                country: 'US',
            },
        },
        metadata: {
            hotelId,
            userId: req.user.id,
        },
    });

    if (!paymentIntent.client_secret) {
        return next(new customError(500, 'Error creating payment intent'));
    }

    res.status(200).json(
        new ApiResponse(200, {
            paymentIntentId: paymentIntent.id,
            clientSecret: paymentIntent.client_secret.toString(),
            totalCost,
        })
    );
});

export const bookings = asyncHandler(async (req, res, next) => {
    const { paymentIntentId } = req.body;
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (!paymentIntent) {
        return next(new customError(400, 'payment intent not found'));
    }

    if (paymentIntent.metadata.hotelId !== req.params.hotelId || paymentIntent.metadata.userId !== req.user.id) {
        return next(new customError(400, 'payment intent mismatch'));
    }

    if (paymentIntent.status !== 'succeeded') {
        return next(new customError(400, `payment intent not succeeded. Status: ${paymentIntent.status}`));
    }

    const newBooking = { ...req.body, userId: req.user.id };
    const hotel = await Hotel.findOneAndUpdate({ _id: req.params.hotelId }, { $push: { bookings: newBooking } });
    if (!hotel) {
        return next(new customError(400, 'hotel not found'));
    }

    res.status(200).json(new ApiResponse(200, { hotelId: hotel._id }));
});
