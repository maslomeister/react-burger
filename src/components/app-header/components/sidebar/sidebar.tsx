import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { NavLinkWithIcon } from "../nav-link-with-icon/nav-link-with-icon";
import {
  ProfileIcon,
  ArrowDownIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { urls } from "../../../../utils/urls";
import { DropDownIcon } from "../drop-down-icon/drop-down-icon";

import styles from "./sidebar.module.css";

const enterAnimation = { y: "-50px", opacity: 0 };

const animateWithDelay = (delayAmount: number) => {
  return { y: "0", opacity: 1, transition: { delay: delayAmount * 0.025 } };
};

const exitAnimation = {
  y: "-50px",
  opacity: 0,
  transition: { duration: 0.1 },
};

interface ISidebar {
  showSidebar: boolean;
  toggleSidebar: () => void;
  authorized: boolean;
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

export function Sidebar({ showSidebar, toggleSidebar, authorized }: ISidebar) {
  const location = useLocation();
  const [showProfileSubMenu, setProfileSubMenu] = useState(false);

  const profileSubMenuToggle = () => {
    setProfileSubMenu(!showProfileSubMenu);
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

            {authorized ? (
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
                <DropDownIcon isOpened={showProfileSubMenu} />
              </div>
            ) : (
              <div className={styles["sidebar-item"]} onClick={toggleSidebar}>
                <NavLinkWithIcon
                  url={urls.login}
                  pathname={location.pathname}
                  text="Войти"
                  iconType="profile"
                />
              </div>
            )}

            <AnimatePresence>
              {showProfileSubMenu && (
                <>
                  <motion.div
                    key="submenu-first"
                    initial={enterAnimation}
                    animate={animateWithDelay(0)}
                    exit={exitAnimation}
                    className={styles["sidebar-submenu__item"]}
                  >
                    <NavLink
                      className={setActive}
                      to={urls.profile}
                      state={{ from: location.pathname }}
                      end
                      onClick={toggleSidebar}
                    >
                      Профиль
                    </NavLink>
                  </motion.div>
                  <motion.div
                    key="submenu-second"
                    initial={enterAnimation}
                    animate={animateWithDelay(1)}
                    exit={exitAnimation}
                    className={styles["sidebar-submenu__item"]}
                  >
                    <NavLink
                      className={setActive}
                      to={urls.profileOrders}
                      state={{ from: location.pathname }}
                      end
                      onClick={toggleSidebar}
                    >
                      История заказов
                    </NavLink>
                  </motion.div>

                  <motion.div
                    key="submenu-third"
                    initial={enterAnimation}
                    animate={animateWithDelay(2)}
                    exit={exitAnimation}
                    className={styles["sidebar-submenu__item"]}
                  >
                    <NavLink
                      className={setActive}
                      to={urls.logout}
                      state={{ from: location.pathname }}
                      end
                      onClick={toggleSidebar}
                    >
                      Выход
                    </NavLink>
                  </motion.div>
                </>
              )}

              <motion.div
                layout="position"
                key="Конструктор бургеров"
                className={styles["sidebar-item"]}
                onClick={toggleSidebar}
              >
                <NavLinkWithIcon
                  url={urls.home}
                  pathname={location.pathname}
                  text="Конструктор бургеров"
                  iconType="home"
                />
              </motion.div>

              <motion.div
                layout="position"
                key="Лента заказов"
                className={styles["sidebar-item"]}
                onClick={toggleSidebar}
              >
                <NavLinkWithIcon
                  url={urls.feed}
                  pathname={location.pathname}
                  text="Лента заказов"
                  iconType="feed"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
