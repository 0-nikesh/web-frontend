import React from "react";

function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                <div className="flex justify-center mb-6">
                    <img
                        src="src/assets/icon/login-logo.svg" // Replace with the actual logo URL
                        alt="Logo"
                        className="w-16 h-16"
                    />
                </div>
                <h1 className="text-2xl font-bold text-center mb-2">Login</h1>
                <p className="text-gray-600 text-center mb-6">Welcome Back! You have been missed.</p>
                <form>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                            >
                                {/* Add an eye icon for showing/hiding password */}
                                👁️
                            </button>
                        </div>
                    </div>
                    <div className="mb-4 text-right">
                        <a href="/forgot-password" className="text-blue-500 hover:underline">
                            Forgot Password?
                        </a>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center text-gray-600 mt-6">
                    Don’t Have An Account?{" "}
                    <a href="/signup" className="text-blue-500 hover:underline">
                        Sign Up
                    </a>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
