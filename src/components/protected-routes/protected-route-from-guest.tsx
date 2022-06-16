import { useLocation, Navigate, RouteProps } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../services/hooks";
import { getNewAccessToken } from "../../services/reducers/auth/auth";
import { userAuthorized, isTokenExpired, tokenExists } from "../../utils/utils";
import { LoadingScreen } from "../loading-screen/loading-screen";

export function ProtectedRouteFromGuest({ children }: RouteProps) {
  const dispatch = useAppDispatch();
  const { user, tokens, status } = useAppSelector((state) => state.authUser);
  const location = useLocation();

  if (tokenExists(tokens.refreshToken) && isTokenExpired(tokens.accessToken)) {
    dispatch(getNewAccessToken(tokens.refreshToken));
  }

  if (status === "getUserData/loading" || status === "getToken/loading") {
    return <LoadingScreen text="Загрузка данных" size="medium" />;
  }

  if (!userAuthorized(user)) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
