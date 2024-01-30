import Hotel from "../models/hotel.model.js";
import uploadOnCloudinary from "../services/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const addNewHotel = asyncHandler(async (req, res, next) => {
    const newHotel = req.body;
    const { imageFiles } = req.files;

    const uploadPromises = imageFiles.map(async (image) => {
        const uploadedFile = await uploadOnCloudinary(image.path);
        return uploadedFile.url;
    });

    const imageUrls = await Promise.all(uploadPromises);
    newHotel.imageUrls = imageUrls;
    newHotel.userId = req.user._id;
    console.log(newHotel);

    const hotel = new Hotel(newHotel);
    await hotel.save();

    res.status(201).json(new ApiResponse(201, hotel, "Hotel added successfully"));
});

export { addNewHotel };
