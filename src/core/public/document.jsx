import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Navbar from "../../components/navbar";

const Documents = () => {
  const [guidances, setGuidances] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  const fetchGuidances = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.log("No token found. Please log in.");
        return;
      }

      const response = await axios.get("http://localhost:3000/api/guidances/getall", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setGuidances(response.data);
    } catch (error) {
      console.error("Error fetching guidances:", error.message);
    }
  };

  useEffect(() => {
    fetchGuidances();
  }, []);

  const getImageSource = (thumbnail) => {
    if (thumbnail.startsWith("data:image/")) return thumbnail;
    if (thumbnail.startsWith("http")) return thumbnail;
    return `http://localhost:3000/${thumbnail}`;
  };

  const handleCardClick = (id) => {
    navigate(`/documents/${id}`); // Navigate to the detailed page with the guidance ID
  };

  return (
    <div className="min-h-screen bg-primary dark:bg-surface-dark">
      <Navbar />
      <div className="p-4 md:p-10 max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-text dark:text-text-dark mb-6">
          Detailed Guidelines
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guidances.map((doc, index) => (
            <div
              key={index}
              className="bg-white dark:bg-surface-dark shadow-lg rounded-xl p-4 hover:shadow-xl transition-all cursor-pointer"
              onClick={() => handleCardClick(doc._id)}
            >
              <div className="flex items-center space-x-4">
                <img
                  src={getImageSource(doc.thumbnail)}
                  alt={doc.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-text dark:text-text-dark">{doc.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{doc.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Documents;
