import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { useAppSelector, useAppDispatch } from "../../services/hooks";
import { loginUserProfile } from "../../services/reducers/auth/auth";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useFormAndValidation } from "../../hooks/useFromAndValidate";
import { urls } from "../../utils/urls";

import styles from "./auth-pages.module.css";

export function Login() {
  let content;
  const dispatch = useAppDispatch();

  const { status, error } = useAppSelector((state) => state.authUser);

  const [revealPassword, setRevealPassword] = useState(false);

  const {
    values,
    handleChange,
    handleFocus,
    errors,
    showErrors,
    isValidCheck,
  } = useFormAndValidation();

  const submitForm = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (isValidCheck() && values.email && values.password)
      dispatch(
        loginUserProfile({ email: values.email, password: values.password })
      );
  };

  const input = (loading: boolean, error?: string, success?: string) => {
    return (
      <>
        <form className={styles["form-container"]} onSubmit={submitForm}>
          <p className="text text_type_main-medium mb-6">Вход</p>
          <div className="mb-6">
            <Input
              name="email"
              type="email"
              placeholder={"E-mail"}
              disabled={loading ? true : false}
              error={showErrors.email}
              errorText={errors.email}
              value={values.email ?? ""}
              onChange={handleChange}
              onFocus={handleFocus}
            />
          </div>

          <div className="mb-6">
            <Input
              name="password"
              icon={revealPassword ? "HideIcon" : "ShowIcon"}
              type={revealPassword ? "text" : "password"}
              placeholder={"Пароль"}
              disabled={loading ? true : false}
              error={showErrors.password}
              errorText={errors.password}
              value={values.password ?? ""}
              onChange={handleChange}
              onFocus={handleFocus}
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
          {success ? (
            <p
              className={`${styles["text-success"]} text text_type_main-default mb-20`}
            >
              {success}
            </p>
          ) : null}
        </form>

        {!loading ? (
          <>
            <div className={`${styles["text"]} mb-4`}>
              <p className="text text_type_main-default text_color_inactive">
                Вы новый пользователь?&nbsp;
              </p>

              <Link to={urls.register}>
                <p
                  className={`${styles["text-link"]} text text_type_main-default`}
                >
                  Зарегистрироваться
                </p>
              </Link>
            </div>

            <div className={styles["text"]}>
              <p className="text text_type_main-default text_color_inactive">
                Забыли пароль?&nbsp;
              </p>

              <Link to={urls.forgotPassword}>
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
  } else if (status === "resetPassword/success") {
    content = input(false, error, "Пароль успешно восстановлен");
  } else {
    content = input(false);
  }

  return (
    <motion.div
      key="constructor-page-cf"
      initial={{ x: "+200%" }}
      animate={{ x: "0" }}
      transition={{
        type: "ease",
      }}
      className={styles["container"]}
    >
      {content}
    </motion.div>
  );
}
