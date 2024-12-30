
import '@fortawesome/fontawesome-free/css/all.min.css';

// import React from 'react';
// import navlogo from '../assets/icon/nav-logo.svg';

// const Navbar = () => {
//     return (
//         <div className="flex navbar bg-white shadow-md p-3">
//             {/* Section 01: Logo */}
//             <div className="flex-none flex gap-4 items-center justify-center">
//                 <img src={navlogo} alt="Nav Logo" className="h-10" />
//             </div>
//             {/* Section 02: Search Bar and Icons */}
//             <div className="flex-auto w-64 flex items-center gap-4">
//                 {/* Icons */}
//                 <div className="flex gap-4">
//                     <div className="btn btn-white btn-square bg-red-600">
//                         <i className="fas fa-home" title="Home"></i>
//                     </div>
//                     <div className="btn btn-primary btn-square bg-white">
//                         <i className="fas fa-map-marker-alt" title="Map"></i>
//                     </div>
//                     <div className="btn btn-primary btn-square bg-white">
//                         <i className="fas fa-compass" title="Guidance"></i>
//                     </div>
//                     <div className="btn btn-primary btn-square bg-white">
//                         <i className="fas fa-calendar" title="Calendar"></i>
//                     </div>
//                 </div>
//                 {/* Search Bar */}
//                 <div className="flex-1 w-auto">
//                     <input
//                         type="text"
//                         placeholder="Search"
//                         className="input bg-blue-50 input-bordered w-full"
//                     />
//                 </div>
//             </div>

//             {/* Section 03: Notification and Profile */}
//             <div className="flex-auto w-32 flex items-center justify-end gap-4">
//                 {/* Notification Icon */}
//                 <div className="btn btn-primary btn-square bg-white">
//                     <i className="fas fa-bell" title="Notifications"></i>
//                 </div>

//                 {/* Profile Dropdown */}
//                 <div className="dropdown dropdown-end">
//                     <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
//                         <div className="w-10 rounded-full">
//                             <img
//                                 alt="User Avatar"
//                                 src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
//                             />
//                         </div>
//                     </div>
//                     <ul
//                         tabIndex={0}
//                         className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
//                         <li>
//                             <a className="justify-between">
//                                 Profile
//                                 <span className="badge">New</span>
//                             </a>
//                         </li>
//                         <li>
//                             <a>Settings</a>
//                         </li>
//                         <li>
//                             <a>Logout</a>
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Navbar;


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
      <nav className="flex justify-between items-center p-3">
        {/* Logo */}
        <div>
          <a href="#">
            <img
              src={navlogo}
              alt="Logo"
              style={{ width: "17rem" }}
              className="cursor-pointer"
            />
          </a>
        </div>

        {/* Navigation Links */}
        <div
          className={`nav-links duration-500 md:static absolute bg-white md:min-h-fit min-h-[60vh] left-0 ${
            isMenuOpen ? "top-16" : "top-[-100%]"
          } md:w-auto w-full flex flex-col md:flex-row items-center px-5`}
        >
          <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
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
        <div className="flex items-center gap-6">
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
            className="flex items-center gap-3 cursor-pointer mx-2 rounded-full hover:ring-2 hover:ring-gray-600"
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
