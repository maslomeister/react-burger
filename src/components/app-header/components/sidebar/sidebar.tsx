import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { NavLinkWithIcon } from "../nav-link-with-icon/nav-link-with-icon";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { urls } from "../../../../utils/urls";

import styles from "./sidebar.module.css";

interface ISidebar {
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

const routeMatch = (link: string, active: string) => {
  if (active === link) return styles["menu__item_active"];
  return styles["menu__item"];
};

export function Sidebar({ showSidebar, toggleSidebar }: ISidebar) {
  const location = useLocation();
  const [isProfileSubMenu, setProfileSubMenu] = useState(false);

  const profileSubMenuToggle = () => {
    setProfileSubMenu(!isProfileSubMenu);
  };

  useEffect(() => {
    if (!showSidebar) {
      setProfileSubMenu(false);
    }
  }, [showSidebar]);

  return (
    <AnimatePresence>
      {showSidebar ? (
        <motion.div
          key="sidebar-menu"
          initial={{ x: "-200%" }}
          animate={{ x: "0" }}
          exit={{ x: "-200%", transition: { duration: 0.1 } }}
          transition={{
            type: "tween",
          }}
          className={styles["sidebar"]}
        >
          <div className={styles["sidebar-container"]}>
            <h1 className="mobile-title-container text text_type_main-large">
              Меню
            </h1>

            <div
              className={styles["sidebar-submenu"]}
              onClick={profileSubMenuToggle}
            >
              <div
                className={styles["sidebar-item"]}
                onClick={profileSubMenuToggle}
              >
                <ProfileIcon
                  type={buttonType(urls.profile, location.pathname)}
                />
                <p
                  className={`${routeMatch(
                    urls.profile,
                    location.pathname
                  )} ml-2`}
                >
                  Личный кабинет
                </p>
              </div>
              <p>open</p>
            </div>

            {isProfileSubMenu && (
              <>
                <div className={styles["sidebar-submenu__item"]}>
                  <NavLink
                    className={setActive}
                    to={urls.profile}
                    state={{ from: location.pathname }}
                    end
                    onClick={toggleSidebar}
                  >
                    Профиль
                  </NavLink>
                </div>
                <div className={styles["sidebar-submenu__item"]}>
                  <NavLink
                    className={setActive}
                    to={urls.profileOrders}
                    state={{ from: location.pathname }}
                    end
                    onClick={toggleSidebar}
                  >
                    История заказов
                  </NavLink>
                </div>
                <div className={styles["sidebar-submenu__item"]}>
                  <NavLink
                    className={setActive}
                    to={urls.logout}
                    state={{ from: location.pathname }}
                    end
                    onClick={toggleSidebar}
                  >
                    Выход
                  </NavLink>
                </div>
              </>
            )}

            <div className={styles["sidebar-item"]} onClick={toggleSidebar}>
              <NavLinkWithIcon
                url={urls.home}
                pathname={location.pathname}
                text="Конструктор бургеров"
                iconType="home"
              />
            </div>

            <div className={styles["sidebar-item"]} onClick={toggleSidebar}>
              <NavLinkWithIcon
                url={urls.feed}
                pathname={location.pathname}
                text="Лента заказов"
                iconType="feed"
              />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
