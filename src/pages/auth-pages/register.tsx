import React, { useState } from "react";
import { Link, useLocation, Navigate } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../services/hooks";
import { createUserProfile } from "../../services/auth/auth";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { userAuthorized } from "../../utils/utils";
import { useFormAndValidation } from "../../hooks/useFromAndValidate";
import { LocationProps } from "../../utils/api";

import styles from "./auth-pages.module.css";

export function Register({ from }: { from?: string }) {
  let content;
  const location = useLocation() as LocationProps;
  const dispatch = useAppDispatch();

  const { user, status, error } = useAppSelector((state) => state.authUser);

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
              value={values.name ? values.name : ""}
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
              value={values.email ? values.email : ""}
              onChange={handleChange}
              onFocus={handleFocus}
            />
          </div>
          <div className="mb-6">
            <Input
              name="Password"
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
          <div className={error ? "mb-5" : "mb-20"}>
            <Button
              disabled={loading ? true : false}
              type="primary"
              htmlType="submit"
              size="medium"
            >
              {loading ? <>Идет регистрация</> : <>Зарегестрироваться</>}
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
              Уже зарегестрированы?&nbsp;
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

  if (status === "registerUser/loading") {
    content = input(true);
  } else if (
    status === "getUserData/loading" ||
    status === "getToken/loading"
  ) {
    content = <></>;
  } else if (status === "registerUser/failed") {
    content = input(false, error);
  } else {
    content = input(false);
  }

  if (userAuthorized(user)) {
    return (
      <Navigate
        to={location.state ? location.state.from : "/"}
        replace={true}
      />
    );
  }

  return <div className={styles["container"]}>{content}</div>;
}
