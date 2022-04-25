import React, { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../../services/hooks";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { userAuthorized, validateEmail } from "../../../utils/utils";
import { forgotUserPassword } from "../../../services/auth/auth";

import styles from "./auth-pages.module.css";

export function ForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user, status, error } = useAppSelector((state) => state.authUser);

  const [emailInputError, setEmailInputError] = useState("");
  const [emailInput, setEmailInput] = useState("");

  function validateFields() {
    const emailValidation = validateEmail(emailInput);
    if (!emailValidation.isValid) {
      setEmailInputError(emailValidation.error);
    }

    return emailValidation.isValid ? true : false;
  }

  const checkEmail = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailInput,
      }),
    };

    await dispatch(forgotUserPassword(requestOptions));

    navigate("/reset-password", {
      state: { from: "forgot-password" },
      replace: true,
    });
  };

  const submitForm = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (validateFields()) {
      checkEmail();
    } else {
      setEmailInputError("Поле не может быть пустым");
    }
  };

  const input = (loading: boolean, error?: string) => {
    return (
      <>
        <form className={styles["inner-container"]} onSubmit={submitForm}>
          <p className="text text_type_main-medium mb-6">
            Восстановление пароля
          </p>
          <div className={`${styles["input-item"]} mb-6`}>
            <Input
              type="email"
              placeholder="Email"
              disabled={loading ? true : false}
              value={emailInput}
              error={emailInputError ? true : false}
              errorText={emailInputError}
              onChange={(e) => {
                setEmailInputError("");
                setEmailInput(e.target.value);
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
              {loading ? <>Ищем email</> : <>Восстановить</>}
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

  let content;
  if (status === "forgotPassword/loading") {
    content = input(true);
  } else if (status === "forgotPassword/failed") {
    content = input(false, error);
  } else if (
    status === "getUserData/loading" ||
    status === "getToken/loading"
  ) {
    content = <></>;
  } else {
    content = input(false);
  }

  if (userAuthorized(user)) {
    return <Navigate to="/profile" replace={true} />;
  }

  return <div className={styles["container"]}>{content}</div>;
}
