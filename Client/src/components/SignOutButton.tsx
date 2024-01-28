import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { useQueryClient } from "@tanstack/react-query";

interface ValidationError {
    message: string;
    errors: Record<string, string[]>;
}

const SignOutButton = () => {
    const queryClient = useQueryClient();
    const { showToast } = useAppContext();
    const navigate = useNavigate();

    //logout user..
    const signOut = async () => {
        try {
            await axios.post("/api/v1/users/auth/logout");
            showToast({ message: "user logged out", type: "SUCCESS" });
            await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
            navigate("/");
        } catch (error) {
            if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
                showToast({ message: error.response?.data.message, type: "ERROR" });
            } else {
                const err = error as Error;
                showToast({ message: err.message, type: "ERROR" });
            }
        }
    };

    return (
        <button
            className="px-3 font-bold text-blue-600 bg-white rounded-md hover:bg-gray-100"
            onClick={signOut}
        >
            Sign Out
        </button>
    );
};

export default SignOutButton;
