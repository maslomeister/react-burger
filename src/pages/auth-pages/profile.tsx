import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
import { useFormAndValidation } from "../../hooks/useFromAndValidate";
import { getCookie } from "../../utils/utils";

import styles from "./auth-pages.module.css";

const setActive = (
  { isActive }: { isActive: boolean },
  additionalClass: String
) =>
  "text text_type_main-default " +
  (isActive ? "" : "text_color_inactive ") +
  additionalClass;

export function Profile() {
  let content = null;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user, status, error } = useAppSelector((state) => state.authUser);

  const [nameInputDisabled, setNameInputDisabled] = useState(true);
  const [emailInputDisabled, setEmailInputDisabled] = useState(true);
  const [inputFieldsChanged, setInputFieldsChanged] = useState(false);
  const {
    values,
    handleChange,
    handleFocus,
    errors,
    showErrors,
    resetForm,
    resetValue,
    isValidCheck,
  } = useFormAndValidation();

  useEffect(() => {
    resetForm({ name: user.name, email: user.email });
  }, [resetForm, user]);

  function resetFields() {
    resetForm({ name: user.name, email: user.email });

    setNameInputDisabled(true);
    setEmailInputDisabled(true);
    setInputFieldsChanged(false);
  }

  useEffect(() => {
    if (values.name === user.name && values.email === user.email) {
      setInputFieldsChanged(false);
    }
  }, [values, values.name, values.email, user.name, user.email]);

  useEffect(() => {
    if (
      (!nameInputDisabled || !emailInputDisabled) &&
      (values.name !== user.name || values.email !== user.email)
    ) {
      setInputFieldsChanged(true);
    }
  }, [emailInputDisabled, nameInputDisabled, user.email, user.name, values]);

  const getNewToken = async () => {
    await dispatch(getNewAccessToken());
  };

  const changeUserData = async () => {
    let accessToken = getCookie("accessToken");

    if (accessToken === undefined) {
      await getNewToken();
    }
    await dispatch(
      getOrUpdateUserData({
        method: "update",
        name: values.name,
        email: values.email,
      })
    );
    resetFields();
  };

  function submitForm(e: React.SyntheticEvent) {
    e.preventDefault();
    const refreshToken = getCookie("refreshToken");
    if (!refreshToken) {
      dispatch(resetState());
      navigate("/login", { replace: true });
    } else {
      if (inputFieldsChanged) {
        if (isValidCheck()) changeUserData();
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
            name="name"
            type="text"
            placeholder={"Имя"}
            disabled={loading ? true : nameInputDisabled}
            error={showErrors.name}
            errorText={errors.name}
            value={values.name ? values.name : ""}
            onChange={handleChange}
            onFocus={handleFocus}
            onIconClick={() => {
              if (inputFieldsChanged) resetValue("name", user.name);
              setNameInputDisabled(!nameInputDisabled);
            }}
          />
        </div>
        <div className="mb-6">
          <Input
            icon={"EditIcon"}
            name="email"
            type="email"
            placeholder={"E-mail"}
            disabled={loading ? true : emailInputDisabled}
            error={showErrors.email}
            errorText={errors.email}
            value={values.email ? values.email : ""}
            onChange={handleChange}
            onFocus={handleFocus}
            onIconClick={() => {
              if (inputFieldsChanged) resetValue("email", user.email);
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
    <motion.div
      key="profile-page"
      initial={{ x: "+200%" }}
      animate={{ x: "0" }}
      transition={{
        type: "ease",
      }}
    >
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
    </motion.div>
  );
}
