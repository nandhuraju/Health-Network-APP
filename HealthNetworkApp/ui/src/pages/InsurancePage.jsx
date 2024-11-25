import { Link } from "react-router-dom";

const InsurancePage = () => (
  <div className="min-h-screen bg-gradient-to-r from-teal-100 via-blue-100 to-purple-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-lg w-full text-center space-y-8 bg-white p-8 rounded-lg shadow-lg border border-gray-200">
      {/* Heading */}
      <h1 className="text-4xl font-extrabold text-teal-600 mb-4">
        Insurance Management
      </h1>
      <p className="text-xl text-gray-700 mb-8">
        Manage and view all insurance claims, or claim insurance for a patient.
      </p>

      {/* Image placeholder */}
      <div className="mb-8">
        <img
          src="https://www.ethika.co.in/wp-content/uploads/2022/05/List-of-covered-medical-expenses.jpeg" // Replace with actual image URL
          alt="Insurance"
          className="mx-auto rounded-xl shadow-xl transform transition duration-500 hover:scale-105"
        />
      </div>

      {/* Action Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link
          to="/claim-insurance"
          className="w-full py-4 px-6 bg-gradient-to-r from-teal-500 to-teal-700 text-white font-semibold rounded-xl shadow-md hover:from-teal-600 hover:to-teal-800 transform transition duration-300 hover:scale-105"
        >
          Claim Insurance
        </Link>

        <Link
          to="/view-insurance-claims"
          className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-xl shadow-md hover:from-blue-600 hover:to-blue-800 transform transition duration-300 hover:scale-105"
        >
          View All Insurance Claims
        </Link>
      </div>
    </div>
  </div>
);

export default InsurancePage;
