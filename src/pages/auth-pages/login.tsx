import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../services/hooks";
import { loginUserProfile } from "../../services/auth/auth";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  userAuthorized,
  validateEmail,
  validatePassword,
} from "../../utils/utils";
import { LocationProps } from "../../utils/api";

import styles from "./auth-pages.module.css";

export function Login() {
  let content;
  const location = useLocation() as LocationProps;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user, status, error } = useAppSelector((state) => state.authUser);

  const [emailInputError, setEmailInputError] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInputError, setPasswordInputError] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [revealPassword, setRevealPassword] = useState(false);

  function validateFields() {
    const emailValidation = validateEmail(emailInput);
    const passwordValidation = validatePassword(passwordInput);
    if (!emailValidation.isValid) {
      setEmailInputError(emailValidation.error);
    }
    if (!passwordValidation.isValid) {
      setPasswordInputError(passwordValidation.error);
    }

    return emailValidation.isValid && passwordValidation.isValid ? true : false;
  }

  const loginUser = async () => {
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
    if (validateFields()) {
      loginUser();
    }
  };

  useEffect(() => {
    if (userAuthorized(user)) {
      navigate(location.state ? location.state.from : "/", {
        replace: true,
      });
    }
  }, [location.state, navigate, user]);

  const input = (loading: boolean, error?: string) => {
    return (
      <>
        <form className={styles["inner-container"]} onSubmit={submitForm}>
          <p className="text text_type_main-medium mb-6">Вход</p>
          <div className="mb-6">
            <Input
              type="email"
              placeholder={"Email"}
              disabled={loading ? true : false}
              error={emailInputError ? true : false}
              errorText={emailInputError}
              value={emailInput}
              onChange={(e) => {
                setEmailInputError("");
                setEmailInput(e.target.value);
              }}
            />
          </div>

          <div className="mb-6">
            <Input
              icon={revealPassword ? "HideIcon" : "ShowIcon"}
              type={revealPassword ? "text" : "password"}
              placeholder={"Пароль"}
              value={passwordInput}
              disabled={loading ? true : false}
              error={passwordInputError ? true : false}
              errorText={passwordInputError}
              onChange={(e) => {
                setPasswordInputError("");
                setPasswordInput(e.target.value);
              }}
              onIconClick={() => setRevealPassword(!revealPassword)}
            />
          </div>

          <div className={error ? "mb-5" : "mb-20"}>
            <Button
              disabled={loading ? true : false}
              type="primary"
              htmlType="submit"
              size="medium"
            >
              Войти
            </Button>
          </div>

          {error ? (
            <p
              className={`${styles["text-error"]} text text_type_main-default mb-20`}
            >
              {error}
            </p>
          ) : null}
        </form>

        {!loading ? (
          <>
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

  if (status === "loginUser/loading") {
    content = input(true);
  } else if (
    status === "getUserData/loading" ||
    status === "getToken/loading"
  ) {
    content = <></>;
  } else if (status === "loginUser/failed") {
    content = input(false, error);
  } else {
    content = input(false);
  }

  return <div className={styles["container"]}>{content}</div>;
}
