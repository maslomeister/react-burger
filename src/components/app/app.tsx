import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { AppHeader } from "../../components/app-header/app-header";
import {
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  Logout,
  Constructor,
  NotFound,
  Ingredient,
} from "../../pages";
import { ProtectedRoute } from "../protected-route/protected-route";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { fetchIngredients } from "../../services/burger-ingredients";
import { LoadingScreen } from "../loading-screen/loading-screen";
import { ErrorScreen } from "../error-screen/error-screen";
import { getCookie } from "../../utils/utils";
import {
  getNewAccessToken,
  getOrUpdateUserData,
} from "../../services/auth/auth";

function App() {
  let content;
  const location = useLocation();
  const dispatch = useAppDispatch();

  const ingredientId = sessionStorage.getItem("ingredientId");

  const { status, error } = useAppSelector((state) => state.burgerIngredients);
  const refreshToken = getCookie("refreshToken");

  const getNewToken = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: refreshToken }),
    };

    await dispatch(getNewAccessToken(requestOptions));
    getUserData();
  };

  const getUserData = () => {
    const accessToken = getCookie("accessToken");
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: accessToken,
      },
    };

    dispatch(getOrUpdateUserData(requestOptions));
  };

  useEffect(() => {
    if (refreshToken) {
      const accessToken = getCookie("accessToken");
      if (accessToken === undefined) {
        getNewToken();
      } else {
        getUserData();
      }
    }
  }, []);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchIngredients());
    }
  }, [status, dispatch]);

  if (status === "loading" || status === "idle") {
    content = <LoadingScreen text="Данные загружаются" size="medium" />;
  }
  if (status === "failed") {
    content = <ErrorScreen text={`Произошла ошибка: ${error}`} />;
  } else if (status === "succeeded") {
    content = (
      <Routes>
        <Route path="/" element={<Constructor />} key={location.pathname} />
        <Route path="login" element={<Login />} key={location.pathname} />
        <Route path="register" element={<Register />} key={location.pathname} />
        <Route
          path="forgot-password"
          element={<ForgotPassword key={location.pathname} />}
        />
        <Route
          path="reset-password"
          element={<ResetPassword key={location.pathname} />}
        />
        <Route
          path="ingredients/:id"
          element={
            ingredientId ? (
              <Constructor />
            ) : (
              <Ingredient key={location.pathname} />
            )
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
          key={location.pathname}
        />
        <Route
          path="profile/orders"
          element={
            <ProtectedRoute>
              <></>
            </ProtectedRoute>
          }
          key={location.pathname}
        />
        <Route
          path="logout"
          element={
            <ProtectedRoute>
              <Logout />
            </ProtectedRoute>
          }
          key={location.pathname}
        />
        <Route path="*" element={<NotFound />} key={location.pathname} />
      </Routes>
    );
  }

  return (
    <AnimatePresence>
      <div className="App">
        <AppHeader />
        {content}
      </div>
    </AnimatePresence>
  );
}

export default App;
