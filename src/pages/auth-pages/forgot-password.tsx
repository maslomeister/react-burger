import React from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../services/hooks";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { userAuthorized } from "../../utils/utils";
import { useFormAndValidation } from "../../hooks/useFromAndValidate";
import { forgotUserPassword } from "../../services/auth/auth";

import styles from "./auth-pages.module.css";

export function ForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user, status, error } = useAppSelector((state) => state.authUser);

  const {
    values,
    handleChange,
    handleFocus,
    errors,
    showErrors,
    isValidCheck,
  } = useFormAndValidation();

  const checkEmail = async () => {
    await dispatch(forgotUserPassword(values.email!));

    navigate("/reset-password", {
      state: { from: "forgot-password" },
      replace: true,
    });
  };

  const submitForm = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (isValidCheck()) checkEmail();
  };

  const input = (loading: boolean, error?: string) => {
    return (
      <>
        <form className={styles["form-container"]} onSubmit={submitForm}>
          <p className="text text_type_main-medium mb-6">
            Восстановление пароля
          </p>
          <div className={`${styles["input-item"]} mb-6`}>
            <Input
              name="email"
              type="email"
              placeholder={"E-mail"}
              disabled={loading ? true : false}
              error={showErrors.email}
              errorText={errors.email}
              value={values.email ? values.email : ""}
              onChange={handleChange}
              onFocus={handleFocus}
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
