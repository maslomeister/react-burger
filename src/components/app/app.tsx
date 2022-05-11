import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
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
} from "../../pages";
import { Modal } from "../modal/modal";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { ProtectedRoute } from "../protected-route/protected-route";
import { Ingredient } from "../../pages/ingredient/ingredient";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { fetchIngredients } from "../../services/burger-ingredients";
import { LoadingScreen } from "../loading-screen/loading-screen";
import { ErrorScreen } from "../error-screen/error-screen";
import { getCookie } from "../../utils/utils";
import { TLocationProps } from "../../utils/api";
import {
  getNewAccessToken,
  getOrUpdateUserData,
} from "../../services/auth/auth";

function App() {
  let content;
  const dispatch = useAppDispatch();
  const location = useLocation() as TLocationProps;
  const background = location.state && location.state.background;
  const navigate = useNavigate();

  const { status, error } = useAppSelector((state) => state.burgerIngredients);
  const tokenLoad = useAppSelector((state) => state.authUser).status;
  const refreshToken = getCookie("refreshToken");

  useEffect(() => {
    if (refreshToken) {
      const accessToken = getCookie("accessToken");
      if (accessToken === undefined) {
        dispatch(getNewAccessToken());
      } else {
        dispatch(getOrUpdateUserData({}));
      }
    }
  }, [dispatch, refreshToken]);

  useEffect(() => {});

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchIngredients());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (tokenLoad === "getToken/success") {
      dispatch(getOrUpdateUserData({}));
    }
  }, [tokenLoad, dispatch]);

  function onDismiss() {
    navigate(-1);
  }

  if (status === "loading" || status === "idle") {
    content = <LoadingScreen text="Данные загружаются" size="medium" />;
  }
  if (status === "failed") {
    content = <ErrorScreen text={`Произошла ошибка: ${error}`} />;
  } else if (status === "succeeded") {
    content = (
      <>
        <Routes location={background || location}>
          <Route path="/" element={<Constructor />} key={location.pathname} />
          <Route path="login" element={<Login />} key={location.pathname} />
          <Route
            path="register"
            element={<Register />}
            key={location.pathname}
          />
          <Route
            path="forgot-password"
            element={<ForgotPassword />}
            key={location.pathname}
          />
          <Route
            path="reset-password"
            element={<ResetPassword />}
            key={location.pathname}
          />
          <Route path="ingredients/:id" element={<Ingredient />} />

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
        <AnimatePresence>
          {background && (
            <Routes>
              {/* This route fixes end animation of modal window */}
              <Route
                path="/"
                element={
                  <Modal
                    title="Детали ингредиента"
                    onClose={onDismiss}
                    closeIconType="primary"
                  >
                    <IngredientDetails />
                  </Modal>
                }
              />
              <Route
                path="ingredients/:id"
                element={
                  <Modal
                    title="Детали ингредиента"
                    onClose={onDismiss}
                    closeIconType="primary"
                  >
                    <IngredientDetails />
                  </Modal>
                }
              />
            </Routes>
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <div className="App">
      <AppHeader />
      {content}
    </div>
  );
}

export default App;
