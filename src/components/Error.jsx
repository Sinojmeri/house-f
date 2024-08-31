import { useRouteError, Navigate } from 'react-router-dom';
import { UnauthorizedError } from '../utils/Errors';

export function ErrorBoundary() {
  const error = useRouteError();
  if (error instanceof UnauthorizedError) {
    return <Navigate to={`/Login?nextRoute=${error.path}`} replace={true} />;
  }
}
