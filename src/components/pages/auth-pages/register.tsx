import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../../services/hooks";
import { createUserProfile } from "../../../services/auth/auth";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  userAuthorized,
  validateEmail,
  validatePassword,
  validateName,
} from "../../../utils/utils";
import { LocationProps } from "../../../utils/api";

import styles from "./auth-pages.module.css";

export function Register({ from }: { from?: string }) {
  let content;
  const location = useLocation() as LocationProps;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, status, error } = useAppSelector((state) => state.authUser);
  const [nameInputError, setNameInputError] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [emailInputError, setEmailInputError] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInputError, setPasswordInputError] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [revealPassword, setRevealPassword] = useState(false);

  function validateFields() {
    const nameValidation = validateName(nameInput);
    const emailValidation = validateEmail(emailInput);
    const passwordValidation = validatePassword(passwordInput);
    if (!nameValidation.isValid) {
      setNameInputError(nameValidation.error);
    }
    if (!emailValidation.isValid) {
      setEmailInputError(emailValidation.error);
    }
    if (!passwordValidation.isValid) {
      setPasswordInputError(passwordValidation.error);
    }

    return nameValidation.isValid &&
      emailValidation.isValid &&
      passwordValidation.isValid
      ? true
      : false;
  }

  const createUser = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailInput,
        password: passwordInput,
        name: nameInput,
      }),
    };

    dispatch(createUserProfile(requestOptions));
  };

  const submitForm = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (validateFields()) {
      createUser();
    }
  };

  useEffect(() => {
    if (userAuthorized(user)) {
      navigate(location.state ? location.state.from : "/", { replace: true });
    }
  }, [from, location.state, navigate, user]);

  const input = (loading: boolean, error?: string) => {
    return (
      <>
        <form className={styles["inner-container"]} onSubmit={submitForm}>
          <div className="mb-6">
            <Input
              type={"text"}
              placeholder={"Имя"}
              value={nameInput}
              disabled={loading ? true : false}
              error={nameInputError ? true : false}
              errorText={nameInputError}
              onChange={(e) => {
                setNameInputError("");
                setNameInput(e.target.value);
              }}
            />
          </div>
          <div className="mb-6">
            <Input
              type={"email"}
              placeholder={"Email"}
              value={emailInput}
              disabled={loading ? true : false}
              error={emailInputError ? true : false}
              errorText={emailInputError}
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
  } else if (status === "registerUser/failed") {
    content = input(false, error);
  } else {
    content = input(false);
  }

  return <div className={styles["container"]}>{content}</div>;
}
