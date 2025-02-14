import axios from "axios";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"; // Import React Leaflet components
import { useParams } from "react-router-dom";
import Navbar from "../../../components/navbar";


const GovernmentProfileDetail = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);

    const fetchProfileDetail = async () => {
        try {
            const token = localStorage.getItem("authToken");
            if (!token) {
                console.error("No token found. Please log in.");
                return;
            }

            const response = await axios.get(`http://localhost:3000/api/government/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setProfile(response.data);
        } catch (error) {
            console.error("Error fetching profile detail:", error.message);
        }
    };

    useEffect(() => {
        fetchProfileDetail();
    }, [id]);

    if (!profile) {
        return <div>Loading...</div>;
    }

    const getImageSource = (thumbnail) => {
        if (thumbnail.startsWith("data:image/")) return thumbnail;
        if (thumbnail.startsWith("http")) return thumbnail;
        return `http://localhost:3000/${thumbnail}`;
    };

    return (
        <div className="min-h-screen bg-primary dark:bg-surface-dark">
            <Navbar />
            <div className="p-4 md:p-10 max-w-3xl mx-auto bg-white dark:bg-surface-dark shadow-sm rounded-lg">
                <img
                    src={getImageSource(profile.thumbnail)}
                    alt={profile.name}
                    className="w-full h-64 object-cover rounded-lg mb-6"
                />
                <h1 className="text-3xl font-bold text-text dark:text-text-dark mb-4">{profile.name}</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">{profile.description}</p>
                <p className="text-md text-gray-500">Address: {profile.address}</p>

                {/* Map Display */}
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Location on Map</h3>
                    <MapContainer
                        center={[profile.latitude, profile.longitude]}
                        zoom={12}
                        style={{ height: "400px", width: "100%" }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />

                        {/* Main Office Marker */}
                        <Marker position={[profile.latitude, profile.longitude]}>
                            <Popup>{profile.name} (Main Office)</Popup>
                        </Marker>

                        {/* Branches Markers */}
                        {profile.branches &&
                            profile.branches.map((branch, index) => (
                                <Marker key={index} position={[branch.latitude, branch.longitude]}>
                                    <Popup>
                                        <strong>{branch.name}</strong>
                                        <br />
                                        {branch.address}
                                    </Popup>
                                </Marker>
                            ))}
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};

export default GovernmentProfileDetail;
