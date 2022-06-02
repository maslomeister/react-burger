import React, { useState } from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import { motion } from "framer-motion";

import { useAppSelector, useAppDispatch } from "../../services/hooks";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useFormAndValidation } from "../../hooks/useFromAndValidate";
import { resetPasswordUser } from "../../services/reducers/auth/auth";

import styles from "./auth-pages.module.css";

export function ResetPassword() {
  let content;
  const location = useLocation() as TLocationProps;
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
    if (isValidCheck())
      dispatch(
        resetPasswordUser({
          password: values.password!,
          confirmationCode: values.confirmationCode!,
        })
      );
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
              name="password"
              icon={revealPassword ? "HideIcon" : "ShowIcon"}
              type={revealPassword ? "text" : "password"}
              placeholder={"Пароль"}
              disabled={loading ? true : false}
              error={showErrors.password}
              errorText={errors.password}
              value={values.password ? values.password : ""}
              onChange={handleChange}
              onFocus={handleFocus}
              onIconClick={() => setRevealPassword(!revealPassword)}
            />
          </div>
          <div className="mb-6">
            <Input
              name="confirmationCode"
              placeholder={"Введите код из письма"}
              disabled={loading ? true : false}
              error={showErrors.confirmationCode}
              errorText={errors.confirmationCode}
              value={values.confirmationCode ? values.confirmationCode : ""}
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

  if (location.state?.from === undefined) {
    return <Navigate to="/forgot-password" replace={true} />;
  }

  if (status === "resetPassword/success") {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <motion.div
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
