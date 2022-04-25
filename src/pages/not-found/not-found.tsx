import React from "react";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./not-found.module.css";

export function NotFound() {
  return (
    <div className={styles["container"]}>
      <div className={styles["inner-container"]}>
        <div className={styles["icon"]}>
          <CloseIcon type="secondary" />
        </div>
        <p
          className={`${styles["text-shadow"]} text text_type_digits-large ml-4 mr-4`}
        >
          404
        </p>
        <div className={styles["icon"]}>
          <CloseIcon type="secondary" />
        </div>
      </div>
      <p className={`${styles["text-shadow"]} text text_type_main-large mt-4`}>
        Страница не найдена
      </p>
    </div>
  );
}
