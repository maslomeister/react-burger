import React, { useState } from "react";
import { Link, useLocation, Navigate } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../services/hooks";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { LocationProps } from "../../utils/api";
import { userAuthorized, validatePassword } from "../../utils/utils";
import { resetPasswordUser } from "../../services/auth/auth";

import styles from "./auth-pages.module.css";

export function ResetPassword() {
  let content;
  const location = useLocation() as LocationProps;
  const dispatch = useAppDispatch();

  const { user, status, error } = useAppSelector((state) => state.authUser);

  const [passwordInputError, setPasswordInputError] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [revealPassword, setRevealPassword] = useState(false);
  const [confirmationCodeInputError, setConfirmationCodeInputError] =
    useState("");
  const [confirmationCodeInput, setConfirmationCodeInput] = useState("");

  function validateFields() {
    const passwordValidation = validatePassword(passwordInput);
    if (!passwordValidation.isValid) {
      setPasswordInputError(passwordValidation.error);
    }
    if (confirmationCodeInput === "") {
      setConfirmationCodeInputError("Поле не может быть пустым");
    }

    if (passwordValidation.isValid && confirmationCodeInput !== "") {
      return true;
    } else {
      return false;
    }
  }

  const changePassword = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password: passwordInput,
        token: confirmationCodeInput,
      }),
    };

    await dispatch(resetPasswordUser(requestOptions));
  };

  const submitForm = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (validateFields()) {
      changePassword();
    }
  };

  const input = (loading: boolean, error?: string) => {
    return (
      <>
        <form className={styles["inner-container"]} onSubmit={submitForm}>
          <p className="text text_type_main-medium mb-6">
            Восстановление пароля
          </p>
          <div className="mb-6">
            <Input
              icon={revealPassword ? "HideIcon" : "ShowIcon"}
              type={revealPassword ? "text" : "password"}
              placeholder={"Введите новый пароль"}
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
          <div className="mb-6">
            <Input
              placeholder={"Введите код из письма"}
              value={confirmationCodeInput}
              disabled={loading ? true : false}
              error={confirmationCodeInputError ? true : false}
              errorText={confirmationCodeInputError}
              onChange={(e) => {
                setConfirmationCodeInputError("");
                setConfirmationCodeInput(e.target.value);
              }}
            />
          </div>

          <div className={error ? "mb-5" : "mb-20"}>
            <Button
              disabled={loading ? true : false}
              type="primary"
              size="medium"
              htmlType="submit"
            >
              Сохранить
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
          <div className={`${styles["text"]} mb-4`}>
            <p className="text text_type_main-default text_color_inactive">
              Вспомнили пароль?&nbsp;
            </p>
            <Link to={"/login"}>
              <p
                className={`${styles["text-link"]} text text_type_main-default`}
              >
                Войти
              </p>
            </Link>
          </div>
        ) : null}
      </>
    );
  };

  if (status === "resetPassword/loading") {
    content = input(true);
  } else if (status === "resetPassword/failed") {
    content = input(false, error);
  } else {
    content = input(false);
  }

  if (!userAuthorized(user)) {
    if (location.state?.from === undefined) {
      return <Navigate to="/forgot-password" replace={true} />;
    }
    if (status === "resetPassword/success") {
      return <Navigate to="/login" replace={true} />;
    }
  } else {
    return <Navigate to="/profile" replace={true} />;
  }

  return <div className={styles["container"]}>{content}</div>;
}
