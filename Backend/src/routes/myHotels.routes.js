import { Router } from "express";
import { addNewHotel } from "../controllers/hotel.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import verifyToken from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validator.middleware.js";
import { hotelSChema } from "../validators/hotel.validator.js";
const router = Router();

router
    .route("/")
    .post(
        verifyToken,
        validate(hotelSChema),
        upload.fields([{ name: "imageFiles", maxCount: 6 }]),
        addNewHotel
    );

export { router as hotelRouter };
