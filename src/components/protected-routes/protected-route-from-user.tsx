import { useLocation, Navigate, RouteProps } from "react-router-dom";

import { useAppSelector } from "../../services/hooks";

import { userAuthorized } from "../../utils/utils";

export function ProtectedRouteFromUser({ children }: RouteProps) {
  const { user } = useAppSelector((state) => state.authUser);
  const location = useLocation() as TLocationProps;

  if (userAuthorized(user)) {
    return (
      <Navigate
        to={location.state?.from ?? "/"}
        state={{ from: location }}
        replace
      />
    );
  }

  return <>{children}</>;
}
