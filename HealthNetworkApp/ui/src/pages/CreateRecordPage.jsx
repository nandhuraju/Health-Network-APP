import { useState } from "react";

const CreateRecordPage = () => {
  const [formData, setFormData] = useState({
    patientId: "",
    name: "",
    diagnosis: "",
  });

  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/createMedicalRecord",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setStatusMessage(data.message);
        setFormData({ patientId: "", name: "", diagnosis: "" }); // Clear form on success
      } else {
        setStatusMessage("Failed to create record. Please try again.");
      }
    } catch (error) {
      console.error("Error creating record:", error);
      setStatusMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Create Patient Record
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="patientId"
          placeholder="Patient ID"
          value={formData.patientId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Patient Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="diagnosis"
          placeholder="Diagnosis"
          value={formData.diagnosis}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-300"
        >
          Create Record
        </button>
      </form>
      {statusMessage && <p className="mt-4 text-center">{statusMessage}</p>}
    </div>
  );
};

export default CreateRecordPage;
