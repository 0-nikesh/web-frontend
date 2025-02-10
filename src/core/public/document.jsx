import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/navbar";

const Documents = () => {
  const [guidances, setGuidances] = useState([]);
  const [expanded, setExpanded] = useState(null);

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

  return (
    <div className="min-h-screen bg-primary dark:bg-surface-dark">
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <div className="p-4 md:p-10 max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-text dark:text-text-dark mb-6">
          Detailed Guidelines
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guidances.map((doc, index) => (
            <div
              key={index}
              className="bg-white dark:bg-surface-dark shadow-lg rounded-xl p-4 hover:shadow-xl transition-all cursor-pointer"
              onClick={() => setExpanded(expanded === index ? null : index)}
            >
              <div className="flex items-center space-x-4">
                <img
                  src={doc.thumbnail.startsWith("data:image/") ? doc.thumbnail : `http://localhost:3000/${doc.thumbnail}`}
                  alt={doc.title}
                  className="w-16 h-16 rounded-lg"
                />
                <div>
                  <h3 className="text-lg font-semibold text-text dark:text-text-dark">{doc.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{doc.category}</p>
                </div>
              </div>
              {expanded === index && (
                <div className="mt-4 text-sm text-gray-700 dark:text-gray-300">
                  <h4 className="font-semibold">Description:</h4>
                  <div dangerouslySetInnerHTML={{ __html: doc.description }} />

                  <h4 className="font-semibold mt-4">Documents Required:</h4>
                  <ul className="ml-4 list-disc">
                    {doc.documents_required.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Documents;
