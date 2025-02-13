import axios from "axios";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../../components/navbar";

const GuidanceDetail = () => {
    const { id } = useParams();
    const [guidance, setGuidance] = useState(null);
    const [documentStatus, setDocumentStatus] = useState([]);

    const fetchGuidanceDetail = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/guidances/${id}`);
            setGuidance(response.data);
            setDocumentStatus(response.data.documents_required.map(() => false));
        } catch (error) {
            console.error("Error fetching guidance detail:", error.message);
        }
    };

    useEffect(() => {
        fetchGuidanceDetail();
    }, [id]);

    const toggleDocumentStatus = (index) => {
        setDocumentStatus((prevStatus) =>
            prevStatus.map((status, i) => (i === index ? !status : status))
        );
    };

    if (!guidance) {
        return <div>Loading...</div>;
    }

    const getImageSource = (thumbnail) => {
        if (thumbnail.startsWith("data:image/")) return thumbnail;
        if (thumbnail.startsWith("http")) return thumbnail;
        return `http://localhost:3000/${thumbnail}`;
    };

    const { government_profile } = guidance;

    return (
        <div className="min-h-screen bg-primary dark:bg-surface-dark">
            <Navbar />
            <div className="p-4 md:p-10 max-w-3xl mx-auto bg-white dark:bg-surface-dark shadow-sm rounded-lg">
                <img
                    src={getImageSource(guidance.thumbnail)}
                    alt={guidance.title}
                    className="w-full h-64 object-cover rounded-lg mb-6"
                />
                <h1 className="text-3xl font-bold text-text dark:text-text-dark mb-4">{guidance.title}</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">{guidance.category}</p>
                {government_profile && (
                    <p className="text-md text-gray-500 mt-2">
                        Associated with:{" "}
                        <Link
                            to={`/government/${government_profile._id}`}
                            className="text-blue-600 hover:underline"
                        >
                            {government_profile.name}
                        </Link>
                    </p>
                )}

                <div className="mt-6">
                    <details className="mb-4">
                        <summary className="font-semibold text-lg cursor-pointer">Documents Required</summary>
                        <ul className="ml-4 list-none">
                            {guidance.documents_required.map((doc, index) => (
                                <li key={index} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={documentStatus[index]}
                                        onChange={() => toggleDocumentStatus(index)}
                                        className="form-checkbox h-5 w-5 text-blue-600"
                                    />
                                    <span
                                        className={`text-gray-700 dark:text-gray-300 ${documentStatus[index] ? "line-through" : ""
                                            }`}
                                    >
                                        {doc}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </details>
                    <details className="mb-4">
                        <summary className="font-semibold text-lg cursor-pointer">Steps to Follow</summary>
                        <div dangerouslySetInnerHTML={{ __html: guidance.description }} />
                    </details>
                    <details className="mb-4">
                        <summary className="font-semibold text-lg cursor-pointer">Cost Required</summary>
                        <p>{guidance.cost_required}</p>
                    </details>
                    <details className="mb-4">
                        <summary className="font-semibold text-lg cursor-pointer">See Nearest Location</summary>
                        {government_profile && government_profile.latitude !== undefined && government_profile.longitude !== undefined ? (
                            <div className="mt-4">
                                <MapContainer
                                    center={[government_profile.latitude, government_profile.longitude]}
                                    zoom={15}
                                    style={{ height: "300px", width: "100%" }}
                                >
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    />
                                    <Marker position={[government_profile.latitude, government_profile.longitude]}>
                                        <Popup>{government_profile.name}</Popup>
                                    </Marker>
                                </MapContainer>
                            </div>
                        ) : (
                            <p>No valid location available for this government profile.</p>
                        )}
                    </details>

                </div>
            </div>
        </div>
    );
};

export default GuidanceDetail;
