import { useState } from "react";
import { readMedicalRecord } from "../api/healthApi";

const ReadRecord = () => {
  const [patientId, setPatientId] = useState("");
  const [record, setRecord] = useState(null);

  const handleRead = async () => {
    try {
      const response = await readMedicalRecord(patientId);
      setRecord(response.data.data);
    } catch (error) {
      console.error(error);
      alert("Error fetching record");
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Patient ID"
        value={patientId}
        onChange={(e) => setPatientId(e.target.value)}
        className="input-field"
      />
      <button onClick={handleRead} className="btn-primary">
        Read Record
      </button>
      {record && (
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(record, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default ReadRecord;
