import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ReadRecordPage from "./pages/ReadRecordPage";
import CreateRecordPage from "./pages/CreateRecordPage";
import UpdateMedicationPage from "./pages/UpdateMedicationPage";
import UpdateTestResultsPage from "./pages/UpdateTestResultsPage";
import HospitalPage from "./pages/HospitalPage";
import InsurancePage from "./pages/InsurancePage";
import ReadAllRecordsPage from "./pages/ReadAllRecordsPage"; // Import the new page
import CreateInsuranceClaimPage from "./pages/CreateInsuranceClaimPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-record" element={<CreateRecordPage />} />
          <Route path="/read-record" element={<ReadRecordPage />} />
          <Route path="/update-medication" element={<UpdateMedicationPage />} />
          <Route
            path="/update-test-results"
            element={<UpdateTestResultsPage />}
          />
          <Route path="/hospital" element={<HospitalPage />} />
          <Route path="/insurance" element={<InsurancePage />} />
          <Route path="/claim-insurance" element={<CreateInsuranceClaimPage/>} />
          <Route
            path="/read-all-records"
            element={<ReadAllRecordsPage />}
          />{" "}
          {/* New route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
