import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/icon/login-logo.svg";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({ email: "", password: "" });

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // Reset error messages
        setError({ email: "", password: "" });

        // Basic form validation
        if (!email || !password) {
            setError({
                email: !email ? "Email is required" : "",
                password: !password ? "Password is required" : "",
            });
            return;
        }

        try {
            setIsLoading(true);

            // Send login request to backend
            const response = await axios.post("http://localhost:3000/api/users/login", {
                email,
                password,
            });

            const { token, user } = response.data;

            // Validate response
            if (!user || typeof user.isAdmin === "undefined") {
                throw new Error("Invalid response from server: Missing user or isAdmin field.");
            }

            // Store the token and user data
            localStorage.setItem("authToken", token);
            localStorage.setItem("user", JSON.stringify(user)); // Store user details (e.g., isAdmin)

            alert("Login successful!");

            // Redirect based on user role
            if (user.isAdmin) {
                navigate("/admin"); // Redirect to admin panel
            } else {
                navigate("/dashboard"); // Redirect to user dashboard
            }
        } catch (err) {
            console.error("Error during login:", err.message);
            alert(err.response?.data?.message || err.message || "An error occurred during login.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-50 font-open-sans p-4">
            <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg p-0.5 shadow-xl w-full max-w-md">
                <div className="bg-white rounded-lg w-full px-8 py-10">
                    <div className="flex justify-center mb-6">
                        <img src={logo} alt="Logo" className="w-24 h-24" />
                    </div>
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
                        Login
                    </h1>
                    <p className="text-sm text-gray-600 text-center mb-6">
                        Welcome Back! You have been missed.
                    </p>
                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                className={`w-full px-4 py-2 border ${error.email ? "border-red-500" : "border-gray-300"
                                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            {error.email && (
                                <p className="text-red-500 text-sm">{error.email}</p>
                            )}
                        </div>

                        <div className="mb-6 relative">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Password
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                className={`w-full px-4 py-2 border ${error.password ? "border-red-500" : "border-gray-300"
                                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-4 top-3 text-gray-500 hover:text-gray-700"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "👁️‍🗨️" : "👁️"}
                            </button>
                            {error.password && (
                                <p className="text-red-500 text-sm">{error.password}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className={`w-full bg-blue-600 py-2 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                            disabled={isLoading}
                        >
                            {isLoading ? "Signing In..." : "Login"}
                        </button>
                    </form>

                    <div className="mt-4 text-center">
                        <a
                            href="#"
                            onClick={() => navigate("/forgot-password")}
                            className="text-sm text-blue-600 hover:text-blue-800"
                        >
                            Forgot Password?
                        </a>
                    </div>

                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">
                            Don’t have an account?{" "}
                            <span
                                onClick={() => navigate("/register")}
                                className="text-blue-600 hover:underline cursor-pointer"
                            >
                                Sign Up
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
