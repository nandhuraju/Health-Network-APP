import React, { useState } from "react";

const CreateInsuranceClaimPage = () => {
  // State to hold form data
  const [claimId, setClaimId] = useState(""); // Added claimId state
  const [patientId, setPatientId] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [medication, setMedication] = useState("");
  const [testResults, setTestResults] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    if (!claimId || !patientId || !diagnosis || !medication || !testResults) {
      setError("All fields are required.");
      return;
    }

    // Prepare data to send to the backend
    const claimData = {
      claimId,
      patientId,
      diagnosis,
      medication,
      testResults,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/createInsuranceClaim",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(claimData),
        }
      );

      const result = await response.json();
      if (response.ok && result.success) {
        setSuccess("Insurance claim created successfully!");
        setError(""); // Clear any previous error
      } else {
        setSuccess("");
        setError(result.message || "Failed to create insurance claim.");
      }
    } catch (err) {
      console.error("Error creating insurance claim:", err);
      setError("An error occurred while creating the insurance claim.");
      setSuccess("");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Create Insurance Claim
      </h2>

      {error && <p className="text-red-500 text-center">{error}</p>}
      {success && <p className="text-green-500 text-center">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="claimId" className="block font-semibold">
            Claim ID
          </label>
          <input
            id="claimId"
            type="text"
            value={claimId}
            onChange={(e) => setClaimId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="patientId" className="block font-semibold">
            Patient ID
          </label>
          <input
            id="patientId"
            type="text"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="diagnosis" className="block font-semibold">
            Diagnosis
          </label>
          <input
            id="diagnosis"
            type="text"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="medication" className="block font-semibold">
            Medication
          </label>
          <input
            id="medication"
            type="text"
            value={medication}
            onChange={(e) => setMedication(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="testResults" className="block font-semibold">
            Test Results
          </label>
          <input
            id="testResults"
            type="text"
            value={testResults}
            onChange={(e) => setTestResults(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Create Claim
        </button>
      </form>
    </div>
  );
};

export default CreateInsuranceClaimPage;
