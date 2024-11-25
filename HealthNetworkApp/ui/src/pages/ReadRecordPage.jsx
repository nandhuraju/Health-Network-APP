import { useState } from "react";

const ReadRecordPage = () => {
  const [patientId, setPatientId] = useState("");
  const [record, setRecord] = useState(null);
  const [error, setError] = useState("");

  const handleFetchRecord = async () => {
    try {
      const response = await fetch("http://localhost:5000/readMedicalRecord", {
        method: "POST", // Use POST to send the patientId in the body
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ patientId }),
      });

      if (response.ok) {
        const data = await response.json();
        setRecord(data.data.value); // Store the record in state
        setError("");
      } else {
        setError("Failed to fetch the record. Please check the Patient ID.");
        setRecord(null);
      }
    } catch (error) {
      console.error("Error fetching record:", error);
      setError("An error occurred while fetching the record.");
      setRecord(null);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Read Patient Record
      </h2>
      <input
        type="text"
        placeholder="Patient ID"
        value={patientId}
        onChange={(e) => setPatientId(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />
      <button
        onClick={handleFetchRecord}
        className="w-full p-3 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition duration-300"
      >
        Fetch Record
      </button>
      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      {record && (
        <div className="mt-6 p-4 border rounded bg-gray-100">
          <h3 className="text-xl font-semibold mb-2">Record Details:</h3>
          <p>
            <strong>Patient ID:</strong> {record.patientId}
          </p>
          <p>
            <strong>Name:</strong> {record.name}
          </p>
          <p>
            <strong>Diagnosis:</strong> {record.diagnosis}
          </p>
          <p>
            <strong>Medication:</strong> {record.medication || "N/A"}
          </p>
          <p>
            <strong>Test Results:</strong> {record.testResults || "N/A"}
          </p>
          <p>
            <strong>Payment Status:</strong> {record.paymentStatus || "N/A"}
          </p>
        </div>
      )}
    </div>
  );
};

export default ReadRecordPage;
