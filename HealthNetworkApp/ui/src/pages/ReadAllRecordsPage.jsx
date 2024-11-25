import React, { useEffect, useState } from "react";

const ReadAllRecordsPage = () => {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch("http://localhost:5000/queryAllRecords", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Fetched data:", data); // Log the full response to see the structure

          // Check if the response structure is correct
          if (data.success && data.data && Array.isArray(data.data)) {
            // Extract records from the 'Record' field in each item of the array
            const formattedRecords = data.data.map((item) => item.Record);
            setRecords(formattedRecords); // Set records to the extracted 'Record' objects
            setError("");
          } else {
            setError("No records found or incorrect data format.");
          }
        } else {
          setError("Failed to fetch records.");
        }
      } catch (error) {
        console.error("Error fetching records:", error);
        setError("An error occurred while fetching records.");
      }
    };

    fetchRecords();
  }, []);

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">
        All Patient Records
      </h2>

      {/* Show error message if there's an error */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Show records if there are any, or show a 'No records' message */}
      <div className="space-y-4">
        {records.length > 0
          ? records.map((record, index) => {
              console.log("Rendered record:", record); // Log each record being rendered
              return (
                <div key={index} className="p-4 border rounded bg-gray-100">
                  <p>
                    <strong>Patient ID:</strong> {record.patientId || "N/A"}
                  </p>
                  <p>
                    <strong>Name:</strong> {record.name || "N/A"}
                  </p>
                  <p>
                    <strong>Diagnosis:</strong> {record.diagnosis || "N/A"}
                  </p>
                  <p>
                    <strong>Medication:</strong> {record.medication || "N/A"}
                  </p>
                  <p>
                    <strong>Test Results:</strong> {record.testResults || "N/A"}
                  </p>
                  <p>
                    <strong>Payment Status:</strong>{" "}
                    {record.paymentStatus || "N/A"}
                  </p>
                </div>
              );
            })
          : !error && (
              <p className="text-center text-gray-500">No records found.</p>
            )}
      </div>
    </div>
  );
};

export default ReadAllRecordsPage;
