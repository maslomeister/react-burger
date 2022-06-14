import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { NavLinkWithIcon } from "../nav-link-with-icon/nav-link-with-icon";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { DropDownIcon } from "../drop-down-icon/drop-down-icon";
import {
  setActiveHelper,
  iconTypeHelper,
  routeMatchHelper,
} from "../../../../utils/helpers";

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
                    type={iconTypeHelper(
                      "/profile",
                      location.pathname,
                      "primary",
                      "secondary"
                    )}
                  />
                  <p
                    className={`text text_type_main-default ml-2 ${routeMatchHelper(
                      "/profile",
                      location.pathname,
                      styles["menu__item_active"],
                      styles["menu__item"]
                    )}`}
                  >
                    Личный кабинет
                  </p>
                </div>
                <DropDownIcon isOpened={showProfileSubMenu} />
              </div>
            ) : (
              <div className={styles["sidebar-item"]}>
                <NavLinkWithIcon
                  url="/login"
                  pathname={location.pathname}
                  text="Войти"
                  iconType="profile"
                  onClick={toggleSidebar}
                  end
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
                      className={({ isActive }) =>
                        `text text_type_main-default ml-2 ${setActiveHelper(
                          isActive,
                          styles["menu__item_active"],
                          styles["menu__item"]
                        )}`
                      }
                      to="/profile"
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
                      className={({ isActive }) =>
                        `text text_type_main-default ml-2 ${setActiveHelper(
                          isActive,
                          styles["menu__item_active"],
                          styles["menu__item"]
                        )}`
                      }
                      to="/profile/orders"
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
                      className={({ isActive }) =>
                        `text text_type_main-default ml-2 ${setActiveHelper(
                          isActive,
                          styles["menu__item_active"],
                          styles["menu__item"]
                        )}`
                      }
                      to="/logout"
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
              >
                <NavLinkWithIcon
                  url="/"
                  pathname={location.pathname}
                  text="Конструктор бургеров"
                  iconType="home"
                  onClick={toggleSidebar}
                  end
                />
              </motion.div>

              <motion.div
                layout="position"
                key="Лента заказов"
                className={styles["sidebar-item"]}
              >
                <NavLinkWithIcon
                  url="/feed"
                  pathname={location.pathname}
                  text="Лента заказов"
                  iconType="feed"
                  onClick={toggleSidebar}
                  end
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
