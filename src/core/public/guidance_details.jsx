import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar";

const GuidanceDetail = () => {
    const { id } = useParams();
    const [guidance, setGuidance] = useState(null);

    const fetchGuidanceDetail = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/guidances/${id}`);
            setGuidance(response.data);
        } catch (error) {
            console.error("Error fetching guidance detail:", error.message);
        }
    };

    useEffect(() => {
        fetchGuidanceDetail();
    }, [id]);

    if (!guidance) {
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
            <div className="p-4 md:p-10 max-w-3xl mx-auto">
                <img
                    src={getImageSource(guidance.thumbnail)}
                    alt={guidance.title}
                    className="w-full h-64 object-cover rounded-lg mb-6"
                />
                <h1 className="text-3xl font-bold text-text dark:text-text-dark mb-4">{guidance.title}</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">{guidance.category}</p>
                {guidance.government_profile && (
                    <p className="text-md text-gray-500 mt-2">
                        Associated with: <strong>{guidance.government_profile.name}</strong>
                    </p>
                )}

                {/* Accordion */}
                <div className="mt-6">
                    <details className="mb-4">
                        <summary className="font-semibold text-lg cursor-pointer">Documents Required</summary>
                        <ul className="ml-4 list-disc">
                            {guidance.documents_required.map((doc, i) => (
                                <li key={i}>{doc}</li>
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
                        <p>{guidance.nearest_location}</p>
                    </details>
                </div>
            </div>
        </div>
    );
};

export default GuidanceDetail;
