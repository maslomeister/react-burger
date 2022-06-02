import { useLocation, Navigate, RouteProps } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../services/hooks";
import { getNewAccessToken } from "../../services/reducers/auth/auth";

import { userAuthorized, isTokenExpired, tokenExists } from "../../utils/utils";

export function ProtectedRouteFromGuest({ children }: RouteProps) {
  let content = children;
  const dispatch = useAppDispatch();
  const { user, tokens } = useAppSelector((state) => state.authUser);
  const location = useLocation();

  if (tokenExists(tokens.refreshToken) && isTokenExpired(tokens.accessToken)) {
    dispatch(getNewAccessToken(tokens.refreshToken));
  }

  if (!userAuthorized(user)) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{content}</>;
}
