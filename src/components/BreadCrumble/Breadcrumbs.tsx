import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Breadcrumbs() {
  const location = useLocation();
  const navigate = useNavigate();

  // Split the pathname into segments (excluding any empty strings)
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav className="mb-4" aria-label="Breadcrumb">
      <ol className="flex items-center text-sm">
        {/* Always include Home */}
        <li>
          <Link to="/" className="text-blue-600 hover:underline">
            Home
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          return (
            <li key={to} className="flex items-center">
              <span className="mx-2">/</span>
              {isLast ? (
                <span className="text-gray-500">{decodeURIComponent(value)}</span>
              ) : (
                <Link to={to} className="text-blue-600 hover:underline">
                  {decodeURIComponent(value)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="mt-2 text-xs text-gray-600 hover:underline"
      >
        Go Back
      </button>
    </nav>
  );
}
