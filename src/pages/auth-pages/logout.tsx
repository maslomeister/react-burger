import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { useAppSelector, useAppDispatch } from "../../services/hooks";
import { LoadingScreen } from "../../components/loading-screen/loading-screen";
import { logoutUserProfile } from "../../services/auth/auth";

import styles from "./auth-pages.module.css";

export function Logout() {
  let content = null;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.authUser);

  useEffect(() => {
    dispatch(logoutUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (status === "logout/success") {
      navigate("/login", { state: { from: "/profile" }, replace: true });
    }
  }, [navigate, status]);

  if (status === "logout/loading") {
    content = (
      <LoadingScreen text={"Выполняется выход из профиля"} size={"medium"} />
    );
  } else if (status === "logout/failed") {
    content = (
      <div className={styles["container"]}>
        <p
          className={`${styles["text-error"]} text text_type_main-large mb-20`}
        >
          {error}
        </p>
      </div>
    );
  }

  return (
    <motion.div
      key="constructor-page-cf"
      initial={{ x: "+200%" }}
      animate={{ x: "0" }}
      transition={{
        type: "ease",
      }}
    >
      {content}
    </motion.div>
  );
}
