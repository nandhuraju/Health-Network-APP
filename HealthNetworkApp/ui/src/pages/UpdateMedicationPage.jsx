import { useState } from "react";

const UpdateMedicationPage = () => {
  const [patientId, setPatientId] = useState("");
  const [medication, setMedication] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdateMedication = async () => {
    try {
      const response = await fetch("http://localhost:5000/updateMedication", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ patientId, medication }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
      } else {
        setMessage("Failed to update medication. Please check the Patient ID.");
      }
    } catch (error) {
      console.error("Error updating medication:", error);
      setMessage("An error occurred while updating medication.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-50 to-indigo-50">
      <div className="p-6 max-w-md w-full bg-white shadow-lg rounded-lg text-center">
        {/* Image placeholder */}
        <img
          src="https://www.shutterstock.com/image-photo/stethoscope-prescription-medication-pill-bottle-260nw-2475315665.jpg" // Replace with actual pharmacy image path
          alt="Pharmacy"
          className="w-full h-40 object-cover rounded-t-lg mb-4"
        />

        {/* Heading */}
        <h2 className="text-2xl font-bold mb-4">Pharmacy: Update Medication</h2>

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
          placeholder="Medication"
          value={medication}
          onChange={(e) => setMedication(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        {/* Submit button */}
        <button
          onClick={handleUpdateMedication}
          className="w-full p-3 bg-purple-600 text-white font-semibold rounded hover:bg-purple-700 transition duration-300"
        >
          Update Medication
        </button>

        {/* Response message */}
        {message && <p className="mt-4 text-center">{message}</p>}
      </div>
    </div>
  );
};

export default UpdateMedicationPage;
