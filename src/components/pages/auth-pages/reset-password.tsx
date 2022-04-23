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

export function ResetPassword() {
  const location = useLocation() as LocationProps;
  const navigate = useNavigate();
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");

  useEffect(() => {
    if (location.state?.from === undefined) {
      navigate("/forgot-password");
    }
  }, [location.state, navigate]);

  return (
    <div className={styles["container"]}>
      <p className="text text_type_main-medium mb-6">Восстановление пароля</p>

      <div className="mb-6">
        <Input
          placeholder={"Введите новый пароль"}
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <Input
          placeholder={"Введите код из письма"}
          value={confirmationCode}
          onChange={(e) => setConfirmationCode(e.target.value)}
        />
      </div>
      <div className="mb-20">
        <Button type="primary" size="medium">
          Сохранить
        </Button>
      </div>
      <div className={`${styles["text"]} mb-4`}>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?&nbsp;
        </p>
        <Link to={"/login"}>
          <p className={`${styles["text-link"]} text text_type_main-default`}>
            Войти
          </p>
        </Link>
      </div>
    </div>
  );
}
