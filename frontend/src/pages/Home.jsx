import { Link } from 'react-router-dom';

function Home() {
  return (
    <section className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
          Find Your Dream Job, Locally.
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Connect with top employers and land your perfect role without leaving your city.
        </p>
        
        {/* Call to Action Buttons */}
        <div className="flex justify-center gap-4">
          <Link 
            to="/Login" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className="bg-gray-200 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
          >
            Register Now
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Home;

