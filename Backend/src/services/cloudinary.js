import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from '../conf/index.js';

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        // Upload the file on Cloudinary......
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto',
            timeout: 5000,
        });

        // File has been successfully uploaded.....
        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath);
        console.log(error);
        return null;
    }
};

export default uploadOnCloudinary;
