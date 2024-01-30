import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext<HotelFormData>();

    return (
        <div className="flex flex-col gap-4">
            <h1 className="mb-3 text-3xl font-bold text-center">Add Hotel</h1>
            <div>
                <label
                    htmlFor="name"
                    className="flex-1 text-sm font-semibold text-gray-700"
                >
                    Name
                </label>
                <input
                    id="name"
                    type="text"
                    className="w-full px-2 py-2 font-normal border rounded"
                    autoComplete="off"
                    {...register("name", {
                        required: { value: true, message: "Hotel name is required" },
                    })}
                />
                <p className="h-2 px-3 pt-1 pb-3 text-sm text-red-600">{errors.name?.message}</p>
            </div>
            <div className="flex gap-4">
                <div className="flex-1">
                    <label
                        htmlFor="city"
                        className="flex-1 text-sm font-semibold text-gray-700"
                    >
                        City
                    </label>
                    <input
                        id="city"
                        type="text"
                        className="w-full px-2 py-2 font-normal border rounded"
                        autoComplete="off"
                        {...register("city", {
                            required: { value: true, message: "city is required" },
                        })}
                    />
                    <p className="h-2 px-3 pt-1 pb-3 text-sm text-red-600">
                        {errors.city?.message}
                    </p>
                </div>
                <div className="flex-1">
                    <label
                        htmlFor="country"
                        className="flex-1 text-sm font-semibold text-gray-700"
                    >
                        Country
                    </label>
                    <input
                        id="country"
                        type="text"
                        className="w-full px-2 py-2 font-normal border rounded"
                        autoComplete="off"
                        {...register("country", {
                            required: { value: true, message: "country is required" },
                        })}
                    />
                    <p className="h-2 px-3 pt-1 pb-3 text-sm text-red-600">
                        {errors.country?.message}
                    </p>
                </div>
            </div>
            <div>
                <label
                    htmlFor="description"
                    className="flex-1 text-sm font-semibold text-gray-700"
                >
                    Description
                </label>
                <textarea
                    id="description"
                    rows={10}
                    className="w-full px-2 py-2 font-normal border rounded resize-none"
                    autoComplete="off"
                    {...register("description", {
                        required: { value: true, message: "description is required" },
                    })}
                />
                <p className="h-2 px-3 pt-1 pb-3 text-sm text-red-600">
                    {errors.description?.message}
                </p>
            </div>
            <div className="max-w-[50%]">
                <label
                    htmlFor="pricePerNight"
                    className="flex-1 text-sm font-semibold text-gray-700"
                >
                    Price per night
                </label>
                <input
                    id="pricePerNight"
                    type="number"
                    className="w-full px-2 py-2 font-normal border rounded resize-none"
                    autoComplete="off"
                    {...register("pricePerNight", {
                        required: { value: true, message: "price is required" },
                        min: { value: 1, message: "minimum price required" },
                    })}
                />
                <p className="h-2 px-3 pt-1 pb-3 text-sm text-red-600">
                    {errors.pricePerNight?.message}
                </p>
            </div>
            <div className="max-w-[50%]">
                <label
                    htmlFor="starRating"
                    className="flex-1 text-sm font-semibold text-gray-700"
                >
                    Star Rating
                </label>
                <select
                    id="starRating"
                    className="w-full p-2 font-normal text-gray-700 border rounded"
                    {...register("starRating", {
                        required: "This field is required",
                    })}
                >
                    <option className="text-sm font-bold">Select as Rating</option>
                    {[1, 2, 3, 4, 5].map((num) => (
                        <option value={num}>{num}</option>
                    ))}
                </select>
                <p className="h-2 px-3 pt-1 pb-3 text-sm text-red-600">
                    {errors.starRating?.message}
                </p>
            </div>
        </div>
    );
};

export default DetailsSection;
