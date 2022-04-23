import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../../services/hooks";
import { LoadingScreen } from "../../../components/loading-screen/loading-screen";
import { loginUserProfile } from "../../../services/auth/auth";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { LocationProps } from "../../../utils/api";

import styles from "./auth-pages.module.css";

export function Login() {
  const location = useLocation() as LocationProps;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { name, status, error } = useAppSelector((state) => state.authUser);
  const [loginPressed, setLoginPressed] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const loginUser = async () => {
    setLoginPressed(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailInput,
        password: passwordInput,
      }),
    };

    dispatch(loginUserProfile(requestOptions));
  };

  const submitForm = (e: React.SyntheticEvent) => {
    e.preventDefault();
    loginUser();
  };

  useEffect(() => {
    if (name !== "") {
      navigate(location.state ? location.state.from : "/", { replace: true });
    }
  }, [location.state, name, navigate]);

  useEffect(() => {
    if (status === "succeeded") {
      navigate(location.state ? location.state.from : "/", { replace: true });
    }
  }, [location.state, navigate, status]);

  const login = (formLoading: boolean, error?: string) => {
    return (
      <>
        <p className="text text_type_main-medium mb-6">Вход</p>
        <form className={styles["inner-container"]} onSubmit={submitForm}>
          <div className="mb-6">
            <Input
              type="email"
              placeholder={"Email"}
              disabled={formLoading ? true : false}
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <Input
              icon={"EditIcon"}
              type="password"
              placeholder={"Пароль"}
              disabled={formLoading ? true : false}
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />
          </div>

          {error ? (
            <div
              className={`${styles["text-error"]} text text_type_main-default mb-6`}
            >
              {error}
            </div>
          ) : null}

          <div className="mb-20">
            <Button
              disabled={formLoading ? true : false}
              type="primary"
              htmlType="submit"
              size="medium"
            >
              {formLoading ? <>Выполняется вход</> : <>Войти</>}
            </Button>
          </div>
        </form>

        {!formLoading ? (
          <>
            <p className="text text_type_main-medium mb-6">Вход</p>
            <div className={`${styles["text"]} mb-4`}>
              <p className="text text_type_main-default text_color_inactive">
                Вы новый пользователь?&nbsp;
              </p>

              <Link to={"/register"}>
                <p
                  className={`${styles["text-link"]} text text_type_main-default`}
                >
                  Зарегестрироваться
                </p>
              </Link>
            </div>

            <div className={styles["text"]}>
              <p className="text text_type_main-default text_color_inactive">
                Забыли пароль?&nbsp;
              </p>

              <Link to={"/forgot-password"}>
                <p
                  className={`${styles["text-link"]} text text_type_main-default`}
                >
                  Восстановить пароль
                </p>
              </Link>
            </div>
          </>
        ) : null}
      </>
    );
  };

  let content;

  if (status === "idle") {
    content = login(false);
  } else if (status === "loading") {
    if (loginPressed) {
      content = login(true);
    } else {
      content = (
        <LoadingScreen
          text={"Загружаются данные о пользователе"}
          size={"medium"}
        />
      );
    }
  } else if (status === "failed") {
    content = login(false, error);
  }

  return <div className={styles["container"]}>{content}</div>;
}
