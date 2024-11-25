import { useState } from "react";
import { createMedicalRecord } from "../api/healthApi";

const CreateRecordForm = () => {
  const [formData, setFormData] = useState({
    patientId: "",
    name: "",
    diagnosis: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createMedicalRecord(formData);
      alert("Record created successfully");
    } catch (error) {
      console.error(error);
      alert("Error creating record");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Patient ID"
        value={formData.patientId}
        onChange={(e) =>
          setFormData({ ...formData, patientId: e.target.value })
        }
        className="input-field"
      />
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="input-field"
      />
      <button type="submit" className="btn-primary">
        Create Record
      </button>
    </form>
  );
};

export default CreateRecordForm;
