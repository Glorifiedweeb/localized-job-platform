import { Link } from 'react-router-dom';

function DashboardHome({ role }) {
  return (
    <section className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">

        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
          Welcome Back!
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          {role === 'employer'
            ? "Post jobs, review applicants, and find your ideal candidate today."
            : "Browse job listings, apply in seconds, and track your applications."
          }
        </p>

        {/* Role-specific actions */}
        <div className="flex justify-center gap-4">
          {role === 'employer' ? (
            <>
              <Link 
                to="/employer-dashboard"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                My Profile
              </Link>
            </>
          ) : (
            <>
              <Link 
                to="/jobs"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Browse Jobs
              </Link>
              <Link 
                to="/employee-dashboard"
                className="bg-gray-200 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
              >
                My Profile
              </Link>
            </>
          )}
        </div>

      </div>
    </section>
  );
}

export default DashboardHome;