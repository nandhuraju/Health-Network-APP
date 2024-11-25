import { Link } from "react-router-dom";

const HomePage = () => (
  <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-lg w-full text-center space-y-8 bg-white p-8 rounded-lg shadow-lg border border-gray-200">
      {/* Heading */}
      <h1 className="text-5xl font-extrabold text-blue-600 mb-4">
        Welcome to the Health Network
      </h1>
      <p className="text-xl text-gray-700 mb-8">
        Efficiently manage patient records, medications, and insurance claims.
        Your health data, securely stored.
      </p>

      {/* Image placeholder */}
      <div className="mb-8">
        <img
          src="https://d2jx2rerrg6sh3.cloudfront.net/image-handler/picture/2021/1/shutterstock_1067569886_(1).jpg"
          alt="Health Network"
          className="mx-auto rounded-xl shadow-xl transform transition duration-500 hover:scale-105"
        />
      </div>

      {/* Action Links - Flexbox for two columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link
          to="/hospital"
          className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-xl shadow-md hover:from-blue-600 hover:to-blue-800 transform transition duration-300 hover:scale-105"
        >
          HOSPITAL
        </Link>

        <Link
          to="/insurance"
          className="w-full py-4 px-6 bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold rounded-xl shadow-md hover:from-green-600 hover:to-green-800 transform transition duration-300 hover:scale-105"
        >
          INSURANCE
        </Link>

        <Link
          to="/update-medication"
          className="w-full py-4 px-6 bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold rounded-xl shadow-md hover:from-purple-600 hover:to-purple-800 transform transition duration-300 hover:scale-105"
        >
          PHARMACY
        </Link>

        <Link
          to="/update-test-results"
          className="w-full py-4 px-6 bg-gradient-to-r from-orange-500 to-orange-700 text-white font-semibold rounded-xl shadow-md hover:from-orange-600 hover:to-orange-800 transform transition duration-300 hover:scale-105"
        >
          LABORATORY
        </Link>
      </div>
    </div>
  </div>
);

export default HomePage;
