import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { urls } from "../../utils/urls";

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

  const profileSubMenuToggle = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setProfileSubMenu(!isProfileSubMenu);
  };

  return (
    <AnimatePresence>
      {showSidebar ? (
        <motion.div
          key="sidebar-menu"
          initial={{ x: "-200%" }}
          animate={{ x: "0" }}
          exit={{ x: "-200%", transition: { duration: 0.15 } }}
          transition={{
            type: "tween",
          }}
          className={styles["sidebar"]}
        >
          <div className={styles["sidebar-container"]}>
            <h1 className="mobile-title-container text text_type_main-large">
              Меню
            </h1>

            <div className={styles["sidebar-submenu-item"]}>
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

            <div className={styles["sidebar-item"]} onClick={toggleSidebar}>
              <BurgerIcon type={buttonType(urls.home, location.pathname)} />
              <NavLink
                className={setActive}
                to={urls.home}
                state={{ from: location.pathname }}
              >
                Конструктор бургеров
              </NavLink>
            </div>

            <div className={styles["sidebar-item"]} onClick={toggleSidebar}>
              <ListIcon type={buttonType(urls.feed, location.pathname)} />
              <NavLink
                className={setActive}
                to={urls.feed}
                state={{ from: location.pathname }}
                end
              >
                Лента заказов
              </NavLink>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
