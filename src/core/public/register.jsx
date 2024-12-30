import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../../assets/icon/login-logo.svg';
const Register = () => {
    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        email: "",
        password: "",
        isAdmin: false,
    });
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

            alert("Registration successful!");
            // Redirect to login page
            navigate("/login");
        } catch (err) {
            console.error("Error during registration:", err.response?.data || err.message);
            alert(err.response?.data?.message || "An error occurred during registration.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-50 font-open-sans p-4">
            <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg p-0.5 shadow-xl w-full max-w-lg">
                <div className="bg-white rounded-lg w-full px-8 py-10">
                    <div className="flex justify-center mb-6">
                        <img
                            src={logo}
                            alt="Logo"
                            className="w-24 h-24"
                        />
                    </div>
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
                        Register
                    </h1>
                    <p className="text-sm text-gray-600 text-center mb-6">
                        Create your account and start your journey with us.
                    </p>
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

                        <div className="mb-4 flex items-center">
                            <input
                                type="checkbox"
                                id="isAdmin"
                                name="isAdmin"
                                className="mr-2"
                                checked={formData.isAdmin}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="isAdmin" className="text-sm font-medium text-gray-700">
                                Register as Admin
                            </label>
                        </div>

                        <button
                            type="submit"
                            className={`w-full bg-blue-600 py-2 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                            disabled={isLoading}
                        >
                            {isLoading ? "Registering..." : "Register"}
                        </button>
                    </form>

                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{" "}
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
