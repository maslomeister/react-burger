import { useLocation, Navigate, RouteProps } from "react-router-dom";

import { useAppSelector } from "../../services/hooks";

import { userAuthorized } from "../../utils/utils";

export function ProtectedRoute({ children }: RouteProps) {
  const { user } = useAppSelector((state) => state.authUser);
  const location = useLocation();

  if (!userAuthorized(user)) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
