import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/icon/login-logo.svg";

const Register = () => {
    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        email: "",
        password: "",
        isAdmin: false,
    });
    const [otp, setOtp] = useState(""); // State to store the OTP entered by the user
    const [isOtpSent, setIsOtpSent] = useState(false); // State to check if OTP has been sent
    const [userId, setUserId] = useState(""); // Store the user ID returned from the backend
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({});
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        // Reset error messages
        setError({});

        // Basic validation
        const { fname, lname, email, password } = formData;
        if (!fname || !lname || !email || !password) {
            setError({
                fname: !fname ? "First name is required" : "",
                lname: !lname ? "Last name is required" : "",
                email: !email ? "Email is required" : "",
                password: !password ? "Password is required" : "",
            });
            return;
        }

        try {
            setIsLoading(true);

            // Send registration request to backend
            const response = await axios.post("http://localhost:3000/api/users/register", formData);

            // If OTP is sent successfully
            setIsOtpSent(true);
            setUserId(response.data.userId); // Store the user ID returned from the backend
            toast.success("OTP sent to your email. Please verify."); // Toast notification for OTP success
        } catch (err) {
            console.error("Error during registration:", err.response?.data || err.message);
            toast.error(err.response?.data?.message || "An error occurred during registration."); // Toast notification for error
        } finally {
            setIsLoading(false);
        }
    };

    const handleOtpVerification = async (e) => {
        e.preventDefault();

        if (!otp) {
            toast.error("Please enter the OTP.");
            return;
        }

        try {
            setIsLoading(true);

            // Verify OTP
            const response = await axios.post("http://localhost:3000/api/users/verify-otp", {
                userId,
                otp,
            });

            toast.success("Account verified successfully!");
            navigate("/login"); // Redirect to login page
        } catch (err) {
            console.error("Error during OTP verification:", err.response?.data || err.message);
            toast.error(err.response?.data?.message || "Invalid or expired OTP.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-50 font-open-sans p-4">
            <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg p-0.5 shadow-xl w-full max-w-lg">
                <div className="bg-white rounded-lg w-full px-8 py-10">
                    <div className="flex justify-center mb-6">
                        <img src={logo} alt="Logo" className="w-24 h-24" />
                    </div>
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
                        {isOtpSent ? "Verify OTP" : "Register"}
                    </h1>
                    <p className="text-sm text-gray-600 text-center mb-6">
                        {isOtpSent
                            ? "Enter the OTP sent to your email to complete registration."
                            : "Create your account and start your journey with us."}
                    </p>

                    {!isOtpSent ? (
                        // Registration Form
                        <form onSubmit={handleRegister}>
                            <div className="mb-4">
                                <label htmlFor="fname" className="block text-sm font-medium text-gray-700 mb-2">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="fname"
                                    name="fname"
                                    className={`w-full px-4 py-2 border ${error.fname ? "border-red-500" : "border-gray-300"
                                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    value={formData.fname}
                                    onChange={handleInputChange}
                                    required
                                />
                                {error.fname && <p className="text-red-500 text-sm">{error.fname}</p>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="lname" className="block text-sm font-medium text-gray-700 mb-2">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="lname"
                                    name="lname"
                                    className={`w-full px-4 py-2 border ${error.lname ? "border-red-500" : "border-gray-300"
                                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    value={formData.lname}
                                    onChange={handleInputChange}
                                    required
                                />
                                {error.lname && <p className="text-red-500 text-sm">{error.lname}</p>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className={`w-full px-4 py-2 border ${error.email ? "border-red-500" : "border-gray-300"
                                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                                {error.email && <p className="text-red-500 text-sm">{error.email}</p>}
                            </div>

                            <div className="mb-6">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className={`w-full px-4 py-2 border ${error.password ? "border-red-500" : "border-gray-300"
                                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                />
                                {error.password && <p className="text-red-500 text-sm">{error.password}</p>}
                            </div>

                            <button
                                type="submit"
                                className={`w-full bg-blue-600 py-2 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                                disabled={isLoading}
                            >
                                {isLoading ? "Sending OTP..." : "Register"}
                            </button>
                        </form>
                    ) : (
                        // OTP Verification Form
                        <form onSubmit={handleOtpVerification}>
                            <div className="mb-6">
                                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                                    Enter OTP
                                </label>
                                <input
                                    type="text"
                                    id="otp"
                                    name="otp"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className={`w-full bg-blue-600 py-2 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                                disabled={isLoading}
                            >
                                {isLoading ? "Verifying OTP..." : "Verify OTP"}
                            </button>
                        </form>
                    )}

                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">
                            {isOtpSent
                                ? "Didn't receive the OTP? Please try registering again."
                                : "Already have an account?"}{" "}
                            <span
                                onClick={() => navigate("/login")}
                                className="text-blue-600 hover:underline cursor-pointer"
                            >
                                Login
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
