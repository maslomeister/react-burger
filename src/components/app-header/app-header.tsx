import { NavLink, useLocation } from "react-router-dom";

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
  const location = useLocation();
  return (
    <header className={styles["header"]}>
      <nav className={styles["header-inner"]}>
        <ul className={`${styles["menu-left"]} mb-4 mt-4`}>
          <li className={`${styles["menu__item"]} ml-5 mr-5 mb-5 mt-5`}>
            <BurgerIcon type={buttonType("/", location.pathname)} />
            <NavLink className={setActive} to="/">
              Конструктор
            </NavLink>
          </li>
          <li className={`${styles["menu__item"]} ml-5 mr-5 mb-5 mt-5`}>
            <ListIcon type={buttonType("/orders", location.pathname)} />
            <NavLink className={setActive} to="/orders">
              Лента заказов
            </NavLink>
          </li>
        </ul>
        <div className={styles["logo"]}>
          <NavLink className={setActive} to="/">
            <Logo />
          </NavLink>
        </div>
        <ul className={`${styles["menu-right"]} mb-4 mt-4`}>
          <li className={`${styles["menu__item"]} ml-5 mr-5 mb-5 mt-5`}>
            <ProfileIcon type={buttonType("/profile", location.pathname)} />
            <NavLink className={setActive} to="/profile">
              Личный кабинет
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;
