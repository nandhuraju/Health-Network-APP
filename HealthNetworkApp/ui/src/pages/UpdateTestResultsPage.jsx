import { useState } from "react";

const UpdateTestResultsPage = () => {
  const [patientId, setPatientId] = useState("");
  const [testResults, setTestResults] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdateTestResults = async () => {
    try {
      const response = await fetch("http://localhost:5000/updateTestResults", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ patientId, testResults }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
      } else {
        setMessage(
          "Failed to update test results. Please check the Patient ID."
        );
      }
    } catch (error) {
      console.error("Error updating test results:", error);
      setMessage("An error occurred while updating test results.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-50 to-blue-50">
      <div className="p-6 max-w-md w-full bg-white shadow-lg rounded-lg text-center">
        {/* Image placeholder */}
        <img
          src="https://cdn.itm.ac.in/2024/05/b-sc-mlt-course-why-should-you-consider-being-a-medical-lab-technician.webp" // Replace with actual laboratory image path
          alt="Laboratory"
          className="w-full h-40 object-cover rounded-t-lg mb-4"
        />

        {/* Heading */}
        <h2 className="text-2xl font-bold mb-4">
          Laboratory: Update Test Results
        </h2>

        {/* Input fields */}
        <input
          type="text"
          placeholder="Patient ID"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="text"
          placeholder="Test Results"
          value={testResults}
          onChange={(e) => setTestResults(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        {/* Submit button */}
        <button
          onClick={handleUpdateTestResults}
          className="w-full p-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-300"
        >
          Update Test Results
        </button>

        {/* Response message */}
        {message && <p className="mt-4 text-center">{message}</p>}
      </div>
    </div>
  );
};

export default UpdateTestResultsPage;
