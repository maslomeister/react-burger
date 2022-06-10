import { useState, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { AppHeader } from "../../components/app-header/app-header";
import {
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  Logout,
  Constructor,
  NotFound,
  Orders,
  IngredientInfo,
  OrderInfoPage,
} from "../../pages";
import { Modal } from "../modal/modal";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { OrderInfoModal } from "../../components/order-info-modal/order-info-modal";
import { ProtectedRouteFromGuest } from "../protected-routes/protected-route-from-guest";
import { ProtectedRouteFromUser } from "../protected-routes/protected-route-from-user";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { fetchIngredients } from "../../services/reducers/burger-ingredients/burger-ingredients";
import { LoadingScreen } from "../loading-screen/loading-screen";
import { ErrorScreen } from "../error-screen/error-screen";
import { tokenExists, isTokenExpired } from "../../utils/utils";
import {
  getUserData,
  getNewAccessToken,
} from "../../services/reducers/auth/auth";

function App() {
  let content;
  const dispatch = useAppDispatch();
  const location = useLocation() as TLocationProps;
  const background = location.state && location.state.background;
  const navigate = useNavigate();

  const { status, error } = useAppSelector((state) => state.burgerIngredients);
  const { tokens } = useAppSelector((state) => state.authUser);
  const accessToken = tokens.accessToken;
  const refreshToken = tokens.refreshToken;

  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  useEffect(() => {
    if (tokenExists(accessToken)) {
      if (!isTokenExpired(accessToken)) {
        dispatch(
          getUserData({
            accessToken: accessToken,
          })
        );
      } else {
        dispatch(getNewAccessToken(refreshToken));
      }
    } else {
      if (tokenExists(refreshToken)) {
        dispatch(getNewAccessToken(refreshToken));
      }
    }
  }, [accessToken, dispatch, refreshToken]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchIngredients());
    }
  }, [status, dispatch]);

  function onDismiss() {
    navigate(-1);
  }

  console.log(background);

  if (status === "loading" || status === "idle") {
    content = <LoadingScreen text="Данные загружаются" size="medium" />;
  }
  if (status === "failed") {
    content = <ErrorScreen text={`Произошла ошибка: ${error}`} />;
  } else if (status === "succeeded") {
    content = (
      <>
        <AppHeader showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
        <Routes location={background || location}>
          <Route path="/" element={<Constructor />} key={location.pathname} />
          <Route
            path="/login"
            element={
              <ProtectedRouteFromUser>
                <Login />
              </ProtectedRouteFromUser>
            }
            key={location.pathname}
          />
          <Route
            path="/register"
            element={
              <ProtectedRouteFromUser>
                <Register />
              </ProtectedRouteFromUser>
            }
            key={location.pathname}
          />
          <Route
            path="/forgot-password"
            element={
              <ProtectedRouteFromUser>
                <ForgotPassword />
              </ProtectedRouteFromUser>
            }
            key={location.pathname}
          />
          <Route
            path="/reset-password"
            element={
              <ProtectedRouteFromUser>
                <ResetPassword />
              </ProtectedRouteFromUser>
            }
            key={location.pathname}
          />
          <Route path="/ingredients/:id" element={<IngredientInfo />} />

          <Route path="/feed" element={<Orders />} key={location.pathname} />
          <Route path="/feed/:id" element={<OrderInfoPage />} />

          <Route
            path="/profile"
            element={
              <ProtectedRouteFromGuest>
                <Profile />
              </ProtectedRouteFromGuest>
            }
            key={location.pathname}
          />

          <Route
            path="/profile/orders"
            element={
              <ProtectedRouteFromGuest>
                <ProfileOrders />
              </ProtectedRouteFromGuest>
            }
            key={location.pathname}
          />
          <Route
            path="/profile/orders/:id"
            element={
              <ProtectedRouteFromGuest>
                <OrderInfoPage />
              </ProtectedRouteFromGuest>
            }
          />
          <Route path="/logout" element={<Logout />} key={location.pathname} />
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
                path="/ingredients/:id"
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
                path="/feed"
                element={
                  <Modal
                    titleIsNumber={true}
                    onClose={onDismiss}
                    closeIconType="primary"
                  >
                    <OrderInfoModal />
                  </Modal>
                }
              />
              <Route
                path="/feed/:id"
                element={
                  <Modal
                    titleIsNumber={true}
                    onClose={onDismiss}
                    closeIconType="primary"
                  >
                    <OrderInfoModal />
                  </Modal>
                }
              />

              <Route
                path="/profile/orders"
                element={
                  <ProtectedRouteFromGuest>
                    <Modal
                      titleIsNumber={true}
                      onClose={onDismiss}
                      closeIconType="primary"
                    >
                      <OrderInfoModal />
                    </Modal>
                  </ProtectedRouteFromGuest>
                }
              />
              <Route
                path="/profile/orders/:id"
                element={
                  <ProtectedRouteFromGuest>
                    <Modal
                      titleIsNumber={true}
                      onClose={onDismiss}
                      closeIconType="primary"
                    >
                      <OrderInfoModal />
                    </Modal>
                  </ProtectedRouteFromGuest>
                }
              />
            </Routes>
          )}
        </AnimatePresence>
      </>
    );
  }

  return <div className="App">{content}</div>;
}

export default App;
