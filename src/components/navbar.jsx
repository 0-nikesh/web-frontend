import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import navlogo from "../assets/icon/nav-logo.svg";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [activeIcon, setActiveIcon] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleIconClick = (icon) => {
    setActiveIcon(icon);
  };

  return (
    <div className={`min-h-screen bg-[#EFF6FF] dark:bg-[#1A1C22]`}>
      {/* Desktop Header */}
      <header className="bg-white dark:bg-[#2A2C33] shadow fixed w-full z-50 hidden md:block">
        <nav className="flex justify-between items-center px-4 py-3 md:px-8">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#">
              <img src={navlogo} alt="Logo" className="w-32 md:w-48 cursor-pointer" />
            </a>
          </div>

          {/* Navigation Links and Search Bar */}
          <div className="flex items-center gap-6 flex-grow justify-center">
            <ul className="flex gap-6">
              {["Home", "Events", "Profiles", "Map", "Documents"].map((item) => (
                <li key={item}>
                  <a
                    href={`/${item.toLowerCase()}`}
                    onClick={() => handleIconClick(item)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg ${activeIcon === item
                      ? "bg-red-500 text-white"
                      : "text-[#697287] dark:text-[#B0BAC9] hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                  >
                    <i className={`fa-solid fa-${item.toLowerCase() === "home" ? "house" : "file-alt"}`}></i> {item}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex-grow mx-6">
              <input
                type="text"
                className="w-full p-2 rounded-full bg-gray-100 dark:bg-gray-800 dark:text-white text-sm placeholder-gray-500"
                placeholder="Search here..."
              />
            </div>
          </div>

          {/* Notification and User Profile */}
          <div className="flex items-center gap-4">
            <button className="text-[#697287] dark:text-[#B0BAC9]">
              <i className="fas fa-bell text-lg"></i>
            </button>
            <a href="/profile">
              <img
                className="w-10 h-10 rounded-full"
                src={user?.image || "https://via.placeholder.com/150"}
                alt="Profile"
              />
            </a>
          </div>
        </nav>
      </header>

      {/* Mobile Header */}
      <header className="bg-white dark:bg-[#2A2C33] shadow fixed w-full z-50 md:hidden">
        <nav className="flex items-center justify-between px-4 py-2">
          {/* Logo */}
          <div>
            <a href="#">
              <img src={navlogo} alt="Logo" className="w-10 h-10" />
            </a>
          </div>
          {/* Search Bar */}
          <div className="flex-grow mx-2">
            <input
              type="text"
              className="w-full p-2 rounded-full bg-gray-100 dark:bg-gray-800 dark:text-white text-sm placeholder-gray-500"
              placeholder="Search here..."
            />
          </div>
          {/* Notification and Profile */}
          <div className="flex items-center gap-3">
            <button className="text-[#697287] dark:text-[#B0BAC9]">
              <i className="fas fa-bell text-lg"></i>
            </button>
            <a href="/profile">
              <img
                className="w-8 h-8 rounded-full"
                src={user?.image || "https://via.placeholder.com/150"}
                alt="Profile"
              />
            </a>
          </div>
        </nav>
      </header>

      {/* Footer Navigation for Mobile */}
      <footer className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-[#2A2C33] shadow-md border-t">
        <nav className="flex justify-around py-2">
          {["Home", "Events", "Profiles", "Map", "Documents"].map((item) => (
            <a
              key={item}
              href={`/${item.toLowerCase()}`}
              onClick={() => handleIconClick(item)}
              className={`flex flex-col items-center px-2 ${activeIcon === item
                ? "bg-red-500 text-white"
                : "text-[#697287] dark:text-[#B0BAC9] hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
            >
              <i className={`fa-solid fa-${item.toLowerCase() === "home" ? "house" : "file-alt"} text-xl`}></i>
              <span className="text-sm">{item}</span>
            </a>
          ))}
        </nav>
      </footer>
    </div>
  );
};

export default Navbar;
