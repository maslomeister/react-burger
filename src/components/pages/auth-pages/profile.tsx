import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../../services/hooks";
import {
  Input,
  Button,
  EditIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./auth-pages.module.css";

export function Profile() {
  const { name, email } = useAppSelector((state) => state.authUser);
  const [nameInputDisabled, setNameInputDisabled] = useState(true);
  const [emailInputDisabled, setEmailInputDisabled] = useState(true);
  const [nameInput, setNameInput] = useState(name);
  const [emailInput, setEmailInput] = useState(email);

  // useEffect(() => {

  // }, []);
  return (
    <div className="mt-30">
      <div className={styles["profile-container"]}>
        <div className={`${styles["profile-items-container"]} mr-15`}>
          <Link to="/profile" className="text text_type_main-medium mb-6">
            Профиль
          </Link>
          <Link
            to="/orders"
            className="text text_type_main-medium mb-6 text_color_inactive"
          >
            История заказов
          </Link>
          <Link to="/logout">
            <p className="text text_type_main-medium mb-20 text_color_inactive">
              Выход
            </p>
          </Link>
          <p className="text text_type_main-default text_color_inactive">
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
        <div className={styles["inner-container"]}>
          <div className="mb-6">
            <Input
              icon={"EditIcon"}
              disabled={nameInputDisabled}
              placeholder={"Имя"}
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onIconClick={() => setNameInputDisabled(!nameInputDisabled)}
            />
          </div>
          <div className="mb-6">
            <Input
              icon={"EditIcon"}
              disabled={emailInputDisabled}
              placeholder={"Email"}
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              onIconClick={() => setEmailInputDisabled(!emailInputDisabled)}
            />
          </div>
          <div className={styles["profile-buttons"]}>
            <Button type="primary" htmlType="submit" size="small">
              Сохранить
            </Button>
            <Button type="primary" htmlType="submit" size="small">
              Отменить
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
