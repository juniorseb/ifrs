import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

// Function to check if a token expiration date is in the past
const isExpired = (expiration) => {
  const currentTime = Date.now();
  const expirationTime = new Date(expiration).getTime();
  return expirationTime < currentTime;
};

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const token = Cookies.get('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/'); // Redirect to the homepage if the token is absent
    } else {
      const tokenExpiration = Cookies.get('tokenExpiration');
      const isTokenExpired = isExpired(tokenExpiration);

      if (isTokenExpired) {
        navigate('/'); // Redirect to the login page if the token is expired
      } else if (window.location.pathname === '/' && !isTokenExpired) {
        navigate('/dashboard'); // Redirect to the dashboard if the route is '/' and the token is valid
      }
    }
  }, [navigate, token]);

  return <Component {...rest} />;
};

export default ProtectedRoute;
