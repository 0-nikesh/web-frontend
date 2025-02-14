import axios from "axios";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../../components/navbar";
import RoutingMachine from "./RoutingMachine"; // Custom component for routing

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of Earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const GuidanceDetail = () => {
    const { id } = useParams();
    const [guidance, setGuidance] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [nearestBranch, setNearestBranch] = useState(null);

    const fetchGuidanceDetail = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/guidances/${id}`);
            setGuidance(response.data);
        } catch (error) {
            console.error("Error fetching guidance detail:", error.message);
        }
    };

    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error("Error getting user location:", error.message);
                    alert("Location access is required to find the nearest branch.");
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    };

    const findNearestBranch = () => {
        if (guidance?.government_profile?.branches && userLocation) {
            let nearest = null;
            let minDistance = Infinity;

            guidance.government_profile.branches.forEach((branch) => {
                const distance = calculateDistance(
                    userLocation.latitude,
                    userLocation.longitude,
                    branch.latitude,
                    branch.longitude
                );
                if (distance < minDistance) {
                    minDistance = distance;
                    nearest = { ...branch, distance };
                }
            });

            setNearestBranch(nearest);
        }
    };

    useEffect(() => {
        fetchGuidanceDetail();
    }, [id]);

    useEffect(() => {
        getUserLocation();
    }, []);

    useEffect(() => {
        if (guidance && userLocation) {
            findNearestBranch();
        }
    }, [guidance, userLocation]);

    if (!guidance) {
        return <div>Loading guidance details...</div>;
    }

    const { government_profile } = guidance;

    return (
        <div className="min-h-screen bg-primary dark:bg-surface-dark">
            <Navbar />
            <div className="p-4 md:p-10 max-w-3xl mx-auto bg-white dark:bg-surface-dark shadow-sm rounded-lg">
                <h1 className="text-3xl font-bold text-text dark:text-text-dark mb-4">{guidance.title}</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">{guidance.category}</p>
                {government_profile && (
                    <p className="text-md text-gray-500 mt-2">
                        Associated with:{" "}
                        <Link to={`/government/${government_profile._id}`} className="text-blue-600 hover:underline">
                            {government_profile.name}
                        </Link>
                    </p>
                )}

                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Location on Map</h3>
                    <MapContainer center={[government_profile.latitude, government_profile.longitude]} zoom={12} style={{ height: "400px", width: "100%" }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />

                        {/* Main Office Marker */}
                        <Marker position={[government_profile.latitude, government_profile.longitude]}>
                            <Popup>{government_profile.name} (Main Office)</Popup>
                        </Marker>

                        {/* Branches Markers */}
                        {government_profile.branches &&
                            government_profile.branches.map((branch, index) => (
                                <Marker key={index} position={[branch.latitude, branch.longitude]}>
                                    <Popup>
                                        <strong>{branch.name}</strong>
                                        <br />
                                        {branch.address}
                                    </Popup>
                                </Marker>
                            ))}

                        {/* Route to Nearest Branch */}
                        {userLocation && nearestBranch && (
                            <RoutingMachine
                                start={[userLocation.latitude, userLocation.longitude]}
                                end={[nearestBranch.latitude, nearestBranch.longitude]}
                            />
                        )}
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};

export default GuidanceDetail;
