import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./auth-pages.module.css";

export function ForgotPassword() {
  const [emailInput, setEmailInput] = useState("");
  return (
    <div className={styles["container"]}>
      <p className="text text_type_main-medium mb-6">Восстановление пароля</p>

      <div className={`${styles["input-item"]} mb-6`}>
        <Input
          placeholder={"Email"}
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
        />
      </div>
      <div className="mb-20">
        <Button type="primary" size="medium">
          Восстановить
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
