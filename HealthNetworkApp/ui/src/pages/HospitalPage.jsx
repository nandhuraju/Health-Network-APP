import React from "react";
import { useNavigate } from "react-router-dom";

const HospitalPage = () => {
  const navigate = useNavigate();

  const handleCreateRecord = () => {
    navigate("/create-record");
  };

  const handleReadRecord = () => {
    navigate("/read-record");
  };

  const handleReadAllRecords = () => {
    navigate("/read-all-records"); // Define a new route for reading all records
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg text-center">
        {/* Image placeholder */}
        <div className="mb-6">
          <img
            src="https://www.iehrdcouncil.com/images/hahr.jpg" // Replace with actual image URL
            alt="Hospital Management"
            className="mx-auto rounded-lg shadow-md"
          />
        </div>

        {/* Heading and description */}
        <h2 className="text-3xl font-bold mb-4 text-blue-700">
          Hospital Management
        </h2>
        <p className="mb-8 text-gray-700">
          Manage patient records and view information.
        </p>

        {/* Action buttons */}
        <button
          onClick={handleCreateRecord}
          className="w-full p-3 mb-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-300"
        >
          Create Record
        </button>

        <button
          onClick={handleReadRecord}
          className="w-full p-3 mb-4 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition duration-300"
        >
          Read Record
        </button>

        <button
          onClick={handleReadAllRecords}
          className="w-full p-3 bg-purple-600 text-white font-semibold rounded hover:bg-purple-700 transition duration-300"
        >
          Read All Records
        </button>
      </div>
    </div>
  );
};

export default HospitalPage;
