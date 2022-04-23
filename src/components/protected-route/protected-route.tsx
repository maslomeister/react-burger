import { useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../services/hooks";
import { getCookie } from "../../utils/utils";
import { getNewAccessToken, getUserProfile } from "../../services/auth/auth";

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const dispatch = useAppDispatch();
  const { name } = useAppSelector((state) => state.authUser);
  let location = useLocation();

  const accessToken = getCookie("accessToken");

  const getNewToken = async () => {
    const refreshToken = getCookie("refreshToken");
    if (!refreshToken) {
      return;
    }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: refreshToken }),
    };

    try {
      const originalPromiseResult = await dispatch(
        getNewAccessToken(requestOptions)
      ).unwrap();
      console.log(originalPromiseResult);
    } catch (rejectedValueOrSerializedError) {
      // handle error here
    }
  };

  const getUserData = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: accessToken,
      },
    };

    try {
      const originalPromiseResult = await dispatch(
        getUserProfile(requestOptions)
      ).unwrap();
      console.log(originalPromiseResult);
    } catch (rejectedValueOrSerializedError) {
      // handle error here
    }
  };

  useEffect(() => {
    if (accessToken === undefined) {
      getNewToken();
    } else {
      getUserData();
    }
  }, []);

  if (name === "") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
