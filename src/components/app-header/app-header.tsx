import { useState } from "react";
import { NavLink } from "react-router-dom";

import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./app-header.module.css";

const setActive = ({ isActive }: { isActive: Boolean }) =>
  "text text_type_main-default ml-2 " +
  (isActive ? styles["menu__item_active"] : styles["menu__item"]);

//Наверное можно лучше
const buttonType = (link: string, active: string) => {
  if (active === link) return "primary";
  return "secondary";
};

function AppHeader() {
  const [activeLink, setActiveLink] = useState("1");
  return (
    <header className={styles["header"]}>
      <nav className={styles["header-inner"]}>
        <ul className={`${styles["menu-left"]} mb-4 mt-4`}>
          <li className={`${styles["menu__item"]} ml-5 mr-5 mb-5 mt-5`}>
            <NavLink
              className={setActive}
              to="/"
              onClick={() => setActiveLink("1")}
            >
              <BurgerIcon type={buttonType(activeLink, "1")} />
              Конструктор
            </NavLink>
          </li>
          <li className={`${styles["menu__item"]} ml-5 mr-5 mb-5 mt-5`}>
            <ListIcon type={buttonType(activeLink, "2")} />
            <NavLink
              className={setActive}
              to="/orders"
              onClick={() => setActiveLink("2")}
            >
              Лента заказов
            </NavLink>
          </li>
        </ul>
        <div className={styles["logo"]}>
          <Logo />
        </div>
        <ul className={`${styles["menu-right"]} mb-4 mt-4`}>
          <li className={`${styles["menu__item"]} ml-5 mr-5 mb-5 mt-5`}>
            <ProfileIcon type={buttonType(activeLink, "3")} />
            <NavLink
              className={setActive}
              to="/account"
              onClick={() => setActiveLink("3")}
            >
              Личный кабинет
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;
