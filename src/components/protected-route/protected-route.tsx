import React, { useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../services/hooks";
import { getCookie, userAuthorized } from "../../utils/utils";
import {
  getNewAccessToken,
  getOrUpdateUserData,
} from "../../services/auth/auth";
import { setIdle } from "../../services/auth/auth";

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user } = useAppSelector((state) => state.authUser);
  let location = useLocation();

  if (!userAuthorized(user)) {
    if (location.pathname === "/logout")
      return <Navigate to="/login" replace />;
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
