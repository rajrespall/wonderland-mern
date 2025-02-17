import { Navigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const ProtectedAssessmentRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (user?.hasCompletedAssessment) {
    return <Navigate to="/whosusing" />;
  }

  return children;
};

export default ProtectedAssessmentRoute;