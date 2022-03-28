import { NavLink } from "react-router-dom";

import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import headerStyles from "./app-header.module.css";

const setActive = ({ isActive }: { isActive: Boolean }) =>
  "text text_type_main-default ml-2 " +
  (isActive ? headerStyles["menu__item_active"] : headerStyles["menu__item"]);

function AppHeader() {
  return (
    <header className={headerStyles["header"]}>
      <nav className={headerStyles["header-inner"]}>
        <ul className={`${headerStyles["menu-left"]} mb-4 mt-4`}>
          <li className={`${headerStyles["menu__item"]} ml-5 mr-5 mb-5 mt-5`}>
            <BurgerIcon type="primary" />
            <NavLink className={setActive} to="/">
              Конструктор
            </NavLink>
          </li>
          <li className={`${headerStyles["menu__item"]} ml-5 mr-5 mb-5 mt-5`}>
            <ListIcon type="primary" />
            <NavLink className={setActive} to="/orders">
              Лента заказов
            </NavLink>
          </li>
        </ul>
        <div className={headerStyles["logo"]}>
          <Logo />
        </div>
        <ul className={`${headerStyles["menu-right"]} mb-4 mt-4`}>
          <li className={`${headerStyles["menu__item"]} ml-5 mr-5 mb-5 mt-5`}>
            <ProfileIcon type="primary" />
            <NavLink className={setActive} to="/account">
              Личный кабинет
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;
