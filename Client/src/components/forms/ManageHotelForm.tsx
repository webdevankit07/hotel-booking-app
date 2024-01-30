import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypesSection from "./TypesSection";

export type HotelFormData = {
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    adultCount: number;
    childCount: number;
    facilites: string[];
    pricePerNight: number;
    starRating: number;
    imageFiles: FileList;
};

const ManageHotelForm = () => {
    const formMethods = useForm<HotelFormData>();
    return (
        <FormProvider {...formMethods}>
            <form
                className="flex flex-col max-w-5xl gap-10 mx-auto my-10"
                noValidate
            >
                <DetailsSection />
                <TypesSection />
            </form>
        </FormProvider>
    );
};

export default ManageHotelForm;
