import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../services/hooks";
import { LoadingScreen } from "../../components/loading-screen/loading-screen";
import { logoutUserProfile } from "../../services/auth/auth";

import styles from "./auth-pages.module.css";

export function Logout() {
  let content;
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
  } else {
    content = <></>;
  }

  return content;
}
