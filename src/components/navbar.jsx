<link
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
  rel="stylesheet"
/>
import React, { useState } from "react";
import navlogo from "../assets/icon/nav-logo.svg";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  return (
    <header className="bg-white shadow fixed w-full z-50">
      <nav className="flex justify-between items-center px-4 py-3 md:px-8">
        {/* Logo */}
        <div>
          <a href="#">
            <img
              src={navlogo}
              alt="Logo"
              className="w-32 md:w-48 cursor-pointer"
            />
          </a>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden border-2 border-red-500">
          <button
            onClick={toggleMenu}
            className="text-gray-500 hover:text-gray-900 focus:outline-none"
          >
            <i className="fas fa-bars text-xl text-black"></i>
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`${isMenuOpen ? "block" : "hidden"
            } md:flex md:items-center absolute md:relative top-16 md:top-auto left-0 md:left-auto w-full md:w-auto bg-white md:bg-transparent md:gap-8 p-4 md:p-0 z-40`}
        >
          <ul className="flex flex-col md:flex-row md:items-center md:gap-6">
            <li>
              <a href="#" className="text-gray-700">
                <div className="text-xl bg-red-800 text-white w-10 h-10 flex justify-center items-center rounded-lg mx-auto hover:bg-blue-800">
                  <i className="fa-solid fa-house"></i>
                </div>
              </a>
            </li>
            <li>
              <a href="/events" className="text-gray-700">
                <div className="text-xl bg-white text-gray-500 w-10 h-10 flex justify-center items-center rounded-lg mx-auto hover:bg-blue-800 hover:text-white">
                  <i className="fa-regular fa-calendar-days"></i>
                </div>
              </a>
            </li>
            <li>
              <a href="/government_profiles" className="text-gray-700">
                <div className="text-xl bg-white text-gray-500 w-10 h-10 flex justify-center items-center rounded-lg mx-auto hover:bg-blue-800 hover:text-white">
                  <i className="fa fa-building"></i>
                </div>
              </a>
            </li>
            <li>
              <a href="/map/" className="text-gray-700">
                <div className="text-xl bg-white text-gray-500 w-10 h-10 flex justify-center items-center rounded-lg mx-auto hover:bg-blue-800 hover:text-white">
                  <i className="fa-solid fa-map-location-dot"></i>
                </div>
              </a>
            </li>
            <li>
              <form className="flex items-center">
                <label htmlFor="simple-search" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 bg-blue-50 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-[#bcbbbb]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="searchInput"
                    className="block w-full p-2.5 pl-10 pr-10 text-sm text-gray-700 bg-blue-50 rounded-lg border border-gray-300 focus:ring-primary-100 focus:border-primary-100"
                    placeholder="Type here to search..."
                    required
                  />
                </div>
              </form>
            </li>
          </ul>
        </div>

        {/* Notifications and Profile */}
        <div className="hidden md:flex items-center gap-6">
          <button
            id="notificationButton"
            type="button"
            className="p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-blue-800 hover:text-white"
          >
            <span className="sr-only">View notifications</span>
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 14 20"
            >
              <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
            </svg>
          </button>

          {/* Profile Dropdown */}
          <div
            className="relative flex items-center gap-3 cursor-pointer rounded-full hover:ring-2 hover:ring-gray-600"
            onClick={toggleProfileDropdown}
          >
            <img
              className="w-10 h-10 rounded-full"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              alt="Profile"
            />
          </div>
          {isProfileDropdownOpen && (
            <div className="absolute right-2 top-14 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Profile Settings
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Feedback
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Change Password
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
