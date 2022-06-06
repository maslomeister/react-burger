import { NavLink, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Hamburger from "hamburger-react";

import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppSelector } from "../../services/hooks";
import { userAuthorized } from "../../utils/utils";
import { LogoSmall } from "../../assets/images/logo-small";
import { urls } from "../../utils/urls";

import styles from "./app-header.module.css";

interface IAppHeader {
  showSidebar: boolean;
  toggleSidebar: () => void;
}

const setActive = ({ isActive }: { isActive: Boolean }) =>
  "text text_type_main-default ml-2 " +
  (isActive ? styles["menu__item_active"] : styles["menu__item"]);

const buttonType = (link: string, active: string) => {
  if (active === link) return "primary";
  return "secondary";
};

export function AppHeader({ showSidebar, toggleSidebar }: IAppHeader) {
  const location = useLocation();
  const { user } = useAppSelector((state) => state.authUser);

  const isMobileOrTablet = useMediaQuery({ query: "(max-width: 1280px)" });

  return (
    <header className={styles["header"]}>
      <nav className={styles["header-inner"]}>
        <ul className={`${styles["menu-left"]} mb-4 mt-4`}>
          <li className={`${styles["menu__item"]} ml-5 mr-5 mb-5 mt-5`}>
            <BurgerIcon type={buttonType(urls.home, location.pathname)} />
            <NavLink
              className={setActive}
              to={urls.home}
              state={{ from: location.pathname }}
            >
              Конструктор
            </NavLink>
          </li>
          <li className={`${styles["menu__item"]} ml-5 mr-5 mb-5 mt-5`}>
            <ListIcon type={buttonType(urls.feed, location.pathname)} />
            <NavLink
              className={setActive}
              to={urls.feed}
              state={{ from: location.pathname }}
              end
            >
              Лента заказов
            </NavLink>
          </li>
        </ul>
        <div className={styles["logo"]}>
          <NavLink to={urls.home} state={{ from: location }}>
            {isMobileOrTablet ? <LogoSmall /> : <Logo />}
          </NavLink>
        </div>
        <div className={styles["hamburger"]}>
          <Hamburger
            rounded
            direction="right"
            onToggle={toggleSidebar}
            toggled={showSidebar}
          />
        </div>
        <ul className={`${styles["menu-right"]} mb-4 mt-4`}>
          <li className={`${styles["menu__item"]} ml-5 mr-5 mb-5 mt-5`}>
            <ProfileIcon type={buttonType(urls.profile, location.pathname)} />
            <NavLink
              className={setActive}
              to={urls.profile}
              state={{ from: location.pathname }}
              end
            >
              {userAuthorized(user) ? <>Личный кабинет</> : <>Войти</>}
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
