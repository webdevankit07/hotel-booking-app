import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../utils/utils";
import { HotelFormData } from "./ManageHotelForm";

const TypesSection = () => {
    const {
        register,
        watch,
        formState: { errors },
    } = useFormContext<HotelFormData>();
    const typeWatch = watch("type");
    return (
        <div>
            <h2 className="mb-3 text-2xl font-bold">Type</h2>
            <div className="grid grid-cols-5 gap-2">
                {hotelTypes.map((type) => (
                    <label
                        className={` flex items-center justify-center cursor-pointer text-sm rounded-full p-2 font-semibold ${
                            typeWatch === type ? "bg-blue-300" : "bg-gray-300"
                        }`}
                    >
                        <input
                            type="radio"
                            value={type}
                            className="hidden"
                            {...register("type", { required: "This field is required" })}
                        />
                        <span>{type}</span>
                    </label>
                ))}
            </div>
            <p className="h-2 px-3 pt-1 pb-3 text-sm text-red-600">{errors.type?.message}</p>
        </div>
    );
};

export default TypesSection;
