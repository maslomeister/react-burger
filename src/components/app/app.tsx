import { Route, Routes, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { AppHeader } from "../../components/app-header/app-header";
import {
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  Constructor,
} from "../pages";
import { ProtectedRoute } from "../protected-route/protected-route";

function App() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <div className="App">
        <AppHeader />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Constructor />
              </ProtectedRoute>
            }
            key={location.pathname}
          />
          <Route path="login" element={<Login />} key={location.pathname} />
          <Route
            path="register"
            element={<Register />}
            key={location.pathname}
          />
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
            element={<Register key={location.pathname} />}
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
        </Routes>
      </div>
    </AnimatePresence>
  );
}

export default App;
