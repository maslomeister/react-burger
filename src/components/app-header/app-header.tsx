import { useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Hamburger from "hamburger-react";

import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { LogoSmall } from "../../assets/images/logo-small";
import { Sidebar } from "./components/sidebar/sidebar";
import { NavLinkWithIcon } from "./components/nav-link-with-icon/nav-link-with-icon";
import { useAppSelector } from "../../services/hooks";
import { userAuthorized } from "../../utils/utils";

import styles from "./app-header.module.css";

interface IAppHeader {
  showSidebar: boolean;
  toggleSidebar: () => void;
}
export function AppHeader({ showSidebar, toggleSidebar }: IAppHeader) {
  const location = useLocation();
  const { user } = useAppSelector((state) => state.authUser);
  const authorized = useMemo(() => userAuthorized(user), [user]);

  const isMobileOrTablet = useMediaQuery({ query: "(max-width: 1023px)" });

  return (
    <>
      <header className={styles["header"]}>
        <nav className={styles["header-inner"]}>
          <ul className={`${styles["menu-left"]} mb-4 mt-4`}>
            <li className={`${styles["menu__item"]} ml-5 mr-5 mb-5 mt-5`}>
              <NavLinkWithIcon
                url="/"
                pathname={location.pathname}
                text="Конструктор"
                iconType="home"
              />
            </li>
            <li className={`${styles["menu__item"]} ml-5 mr-5 mb-5 mt-5`}>
              <NavLinkWithIcon
                url="/feed"
                pathname={location.pathname}
                text="Лента заказов"
                iconType="feed"
              />
            </li>
          </ul>
          <div className={styles["logo"]}>
            <NavLink to="/" state={{ from: location }}>
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
              {authorized ? (
                <NavLinkWithIcon
                  url="/profile"
                  pathname={location.pathname}
                  text="Личный кабинет"
                  iconType="profile"
                />
              ) : (
                <NavLinkWithIcon
                  url="/login"
                  pathname={location.pathname}
                  text="Войти"
                  iconType="profile"
                />
              )}
            </li>
          </ul>
        </nav>
      </header>
      <Sidebar
        showSidebar={showSidebar}
        toggleSidebar={toggleSidebar}
        authorized={authorized}
      />
    </>
  );
}
