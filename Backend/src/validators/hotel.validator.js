import { z } from "zod";

export const hotelSChema = z.object({
    name: z.string({ required_error: "Hotel name is required" }),
    city: z.string({ required_error: "City name is required" }),
    country: z.string({ required_error: "Country name is required" }),
    description: z.string({ required_error: "Hotel description is required" }),
    type: z.string({ required_error: "Hotel type is required" }),
    adultCount: z.number({
        required_error: "adultCount is required",
        invalid_type_error: "adultCount must be a number",
    }),
    childCount: z.number({
        required_error: "childCount is required",
        invalid_type_error: "childCount must be a number",
    }),
    facilites: z.string({ required_error: "facilites is required" }).array(),
    pricePerNight: z.number({
        required_error: "pricePerNight is required",
        invalid_type_error: "pricePerNight must be a number",
    }),
    starRating: z.number({
        required_error: "startRating is required",
        invalid_type_error: "starRating must be a number",
    }),
    imageFiles: z.string({ required_error: "imageFiles is required" }).array(),
});
