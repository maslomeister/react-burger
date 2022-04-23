import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../../services/hooks";
import { createUserProfile } from "../../../services/auth/auth";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { LocationProps } from "../../../utils/api";

import styles from "./auth-pages.module.css";

export function Register() {
  const location = useLocation() as LocationProps;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { name } = useAppSelector((state) => state.authUser);
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

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
    createUser();
  };

  useEffect(() => {
    if (name !== "") {
      navigate(location.state ? location.state.from : "/", { replace: true });
    }
  }, [location.state, name, navigate]);

  const content = (
    <>
      <form className={styles["inner-container"]} onSubmit={submitForm}>
        <div className="mb-6">
          <Input
            placeholder={"Имя"}
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <Input
            placeholder={"Email"}
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <PasswordInput
            name={"Пароль"}
            size={"default"}
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />
        </div>
        <div className="mb-20">
          <Button type="primary" htmlType="submit" size="medium">
            Зарегестрироваться
          </Button>
        </div>
      </form>
      <div className={`${styles["text"]} mb-4`}>
        <p className="text text_type_main-default text_color_inactive">
          Уже зарегестрированы?&nbsp;
        </p>
        <Link to={"/login"}>
          <p className={`${styles["text-link"]} text text_type_main-default`}>
            Войти
          </p>
        </Link>
      </div>
    </>
  );

  return (
    <div className={styles["container"]}>
      <p className="text text_type_main-medium mb-6">Регистрация</p>
      {content}
    </div>
  );
}
