import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Import navigation utilities

export function Store() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if the current path is exactly '/category'
    if (location.pathname === '/category') {
      navigate('/category/mobile-skins', { replace: true });
    }
  }, [location.pathname, navigate]);

  // Return null since this component only handles redirection
  return null;
}