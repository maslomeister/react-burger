import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { useAppSelector, useAppDispatch } from "../../services/hooks";
import { createUserProfile } from "../../services/reducers/auth/auth";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useFormAndValidation } from "../../hooks/useFromAndValidate";

import styles from "./auth-pages.module.css";

export function Register() {
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
    if (isValidCheck())
      dispatch(
        createUserProfile({
          email: values.email!,
          password: values.password!,
          name: values.name!,
        })
      );
  };

  const input = (loading: boolean, error?: string) => {
    return (
      <>
        <form className={styles["inner-container"]} onSubmit={submitForm}>
          <div className="mb-6">
            <Input
              name="name"
              type="text"
              placeholder={"Имя"}
              disabled={loading ? true : false}
              error={showErrors.name}
              errorText={errors.name}
              value={values.name ?? ""}
              onChange={handleChange}
              onFocus={handleFocus}
            />
          </div>
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
              {loading ? <>Идет регистрация</> : <>Зарегистрироваться</>}
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
              Уже зарегистрированы?&nbsp;
            </p>
            <Link to={"login"}>
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

  if (status === "registerUser/loading") {
    content = input(true);
  } else if (
    status === "getUserData/loading" ||
    status === "getToken/loading"
  ) {
    content = null;
  } else if (status === "registerUser/failed") {
    content = input(false, error);
  } else {
    content = input(false);
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
