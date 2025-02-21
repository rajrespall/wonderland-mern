import { Navigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const PublicRoute = ({ children }) => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/whosusing" />;
  }

  return children;
};

export default PublicRoute;