import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import headerStyles from "./app-header.module.css";

function AppHeader() {
  return (
    <header className={headerStyles["header"]}>
      <nav className={headerStyles["header-inner"]}>
        <ul className={`${headerStyles["menu"]} mb-4 mt-4`}>
          <li
            className={`${headerStyles["menu__item_active"]} ml-5 mr-5 mb-5 mt-5`}
          >
            <BurgerIcon type="primary" />
            <a className="text text_type_main-default ml-2" href="/">
              Конструктор
            </a>
          </li>
          <li className={`${headerStyles["menu__item"]} ml-5 mr-5 mb-5 mt-5`}>
            <ListIcon type="primary" />
            <a className="text text_type_main-default ml-2" href="/">
              Лента заказов
            </a>
          </li>
        </ul>
        <Logo />
        <ul className={`${headerStyles["menu"]} mb-4 mt-4`}>
          <li className={`${headerStyles["menu__item"]} ml-5 mr-5 mb-5 mt-5`}>
            <ProfileIcon type="primary" />
            <a className="text text_type_main-default ml-2" href="/">
              Личный кабинет
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;
