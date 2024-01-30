import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
    const { isLoggedIn } = useAppContext();

    return (
        <div className="py-6 bg-blue-800">
            <div className="container mx-auto">
                <div className="flex justify-between px-4 md:px-0">
                    <span className="text-3xl font-bold tracking-tight text-white">
                        <Link to={"/"}>Holidays.com</Link>
                    </span>
                    <span className="flex space-x-2">
                        {!isLoggedIn ? (
                            <>
                                <Link
                                    to={"/sign-in"}
                                    className="flex items-center px-3 font-bold text-blue-600 transition-all duration-100 ease-in-out bg-white rounded-md hover:bg-gray-200"
                                >
                                    Sign In
                                </Link>
                            </>
                        ) : (
                            <>
                                <div className="flex gap-3 mr-5">
                                    <Link
                                        to={"/my-bookings"}
                                        className="flex items-center px-3 font-bold text-blue-600 transition-all duration-100 ease-in-out bg-white rounded-md hover:bg-gray-200"
                                    >
                                        My Bookings
                                    </Link>
                                    <Link
                                        to={"/my-hotels"}
                                        className="flex items-center px-3 font-bold text-blue-600 transition-all duration-100 ease-in-out bg-white rounded-md hover:bg-gray-200"
                                    >
                                        My Hotels
                                    </Link>
                                </div>
                                <SignOutButton />
                            </>
                        )}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Header;
