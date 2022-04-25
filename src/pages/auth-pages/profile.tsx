import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../services/hooks";
import { resetState } from "../../services/auth/auth";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  getOrUpdateUserData,
  getNewAccessToken,
} from "../../services/auth/auth";
import { getCookie, validateName, validateEmail } from "../../utils/utils";

import styles from "./auth-pages.module.css";

const setActive = (
  { isActive }: { isActive: boolean },
  additionalClass: String
) =>
  "text text_type_main-default " +
  (isActive ? "" : "text_color_inactive ") +
  additionalClass;

export function Profile() {
  let content;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user, status, error } = useAppSelector((state) => state.authUser);

  const [nameInputDisabled, setNameInputDisabled] = useState(true);
  const [emailInputDisabled, setEmailInputDisabled] = useState(true);
  const [nameInputError, setNameInputError] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [emailInputError, setEmailInputError] = useState("");
  const [emailInput, setEmailInput] = useState(user.email);
  const [inputFieldsChanged, setInputFieldsChanged] = useState(false);

  function validateFields() {
    const nameValidation = validateName(nameInput);
    const emailValidation = validateEmail(emailInput);
    if (!nameValidation.isValid) {
      setNameInputError(nameValidation.error);
    }
    if (!emailValidation.isValid) {
      setEmailInputError(emailValidation.error);
    }

    return nameValidation.isValid && emailValidation.isValid ? true : false;
  }

  function changeInput(input: string, inputFiledName: "name" | "email") {
    setInputFieldsChanged(true);
    switch (inputFiledName) {
      case "name":
        setNameInputError("");
        setNameInput(input);
        break;
      case "email":
        setEmailInputError("");
        setEmailInput(input);
        break;
    }
  }

  useEffect(() => {
    setNameInput(user.name);
    setEmailInput(user.email);
  }, [user, user.name, user.email]);

  function resetFields() {
    setNameInput(user.name);
    setEmailInput(user.email);
    setNameInputError("");
    setEmailInputError("");

    setNameInputDisabled(true);
    setEmailInputDisabled(true);
    setInputFieldsChanged(false);
  }

  const getNewToken = async () => {
    const refreshToken = getCookie("refreshToken");

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: refreshToken }),
    };

    await dispatch(getNewAccessToken(requestOptions));
  };

  const changeUserData = async () => {
    let accessToken = getCookie("accessToken");

    if (accessToken === undefined) {
      await getNewToken();
    }

    accessToken = getCookie("accessToken");
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: accessToken,
      },
      body: JSON.stringify({
        name: nameInput,
        email: emailInput,
      }),
    };
    await dispatch(getOrUpdateUserData(requestOptions));
    resetFields();
  };

  function submitForm(e: React.SyntheticEvent) {
    e.preventDefault();
    const refreshToken = getCookie("refreshToken");
    if (!refreshToken) {
      dispatch(resetState());
      navigate("/login", { replace: true });
    } else {
      if (nameInput !== user.name || emailInput !== user.email) {
        if (validateFields()) changeUserData();
      } else {
        resetFields();
      }
    }
  }

  const cancelEdit = () => {
    if (user && user.name && user.email) {
      resetFields();
    }
  };

  const input = (loading: boolean, error?: string) => {
    return (
      <form onSubmit={submitForm}>
        <div className="mb-6">
          <Input
            icon={"EditIcon"}
            disabled={loading ? false : nameInputDisabled}
            placeholder={"Имя"}
            value={nameInput}
            error={nameInputError ? true : false}
            errorText={nameInputError}
            onChange={(e) => changeInput(e.target.value, "name")}
            onIconClick={() => setNameInputDisabled(!nameInputDisabled)}
          />
        </div>
        <div className="mb-6">
          <Input
            icon={"EditIcon"}
            disabled={loading ? false : emailInputDisabled}
            placeholder={"Email"}
            value={emailInput}
            error={emailInputError ? true : false}
            errorText={emailInputError}
            onChange={(e) => changeInput(e.target.value, "email")}
            onIconClick={() => {
              setNameInputError("");
              setEmailInputDisabled(!emailInputDisabled);
            }}
          />
        </div>
        {inputFieldsChanged && (
          <div className={styles["profile-buttons"]}>
            {!loading ? (
              <Button type="secondary" htmlType="button" onClick={cancelEdit}>
                Отменить
              </Button>
            ) : null}
            <Button
              disabled={loading ? true : false}
              type="primary"
              htmlType="submit"
            >
              {loading ? <>Данные обновляются</> : <>Сохранить</>}
            </Button>
          </div>
        )}
        {error ? (
          <p className={`${styles["text-error"]} text text_type_main-default`}>
            {error}
          </p>
        ) : null}
      </form>
    );
  };

  if (status === "getUserData/loading") {
    content = input(true);
  } else if (status === "getUserData/failed") {
    content = input(false, error);
  } else {
    content = input(false);
  }

  return (
    <div className="mt-30">
      <div className={styles["profile-container"]}>
        <div className={`${styles["profile-items-container"]} mr-15`}>
          <NavLink
            to="/profile"
            className={(isActive) => setActive(isActive, "mb-6")}
            end
          >
            Профиль
          </NavLink>
          <NavLink
            to="/profile/orders"
            className={(isActive) => setActive(isActive, "mb-6")}
          >
            История заказов
          </NavLink>
          <NavLink
            to="/logout"
            className={(isActive) => setActive(isActive, "mb-20")}
          >
            Выход
          </NavLink>
          <p className="text text_type_main-default text_color_inactive">
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
        {content}
      </div>
    </div>
  );
}
