// src/pages/GovernmentProfiles.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/navbar";

const GovernmentProfiles = () => {
    const [profiles, setProfiles] = useState([]);
    const navigate = useNavigate();

    const fetchGovernmentProfiles = async () => {
        try {
            const token = localStorage.getItem("authToken");
            if (!token) {
                console.log("No token found. Please log in.");
                return;
            }

            const response = await axios.get("http://localhost:3000/api/government/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setProfiles(response.data);
        } catch (error) {
            console.error("Error fetching government profiles:", error.message);
        }
    };

    useEffect(() => {
        fetchGovernmentProfiles();
    }, []);

    const getImageSource = (thumbnail) => {
        if (thumbnail.startsWith("data:image/")) return thumbnail;
        if (thumbnail.startsWith("http")) return thumbnail;
        return `http://localhost:3000/${thumbnail}`;
    };

    const handleCardClick = (id) => {
        navigate(`/government/${id}`);
    };

    return (
        <div className="min-h-screen bg-primary dark:bg-surface-dark">
            <Navbar />
            <div className="p-4 md:p-10 max-w-7xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-center text-text dark:text-text-dark mb-6">
                    Government Profiles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {profiles.map((profile, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-surface-dark shadow-lg rounded-xl p-4 hover:shadow-xl transition-all cursor-pointer"
                            onClick={() => handleCardClick(profile._id)}
                        >
                            <div className="flex items-center space-x-4">
                                <img
                                    src={getImageSource(profile.thumbnail)}
                                    alt={profile.name}
                                    className="w-16 h-16 rounded-lg object-cover"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold text-text dark:text-text-dark">{profile.name}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{profile.address}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GovernmentProfiles;
