import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 text-gray-900">
      <div className="text-center p-8 bg-white shadow-xl rounded-lg max-w-lg">
        <h1 className="text-6xl font-bold text-indigo-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Oops! Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist or has been moved. Don't worry, though! You can go back to the homepage.
        </p>
        <Link to="/" className="btn btn-primary px-6 py-3 rounded-md text-white hover:bg-indigo-700">
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}
