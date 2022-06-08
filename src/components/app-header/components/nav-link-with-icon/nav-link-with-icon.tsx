import React from "react";
import { NavLink } from "react-router-dom";

import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./nav-link-with-icon.module.css";

type TProps = {
  url: string;
  pathname: string;
  text: string;
  iconType: "home" | "feed" | "profile";
};

const setActive = ({ isActive }: { isActive: Boolean }) =>
  "text text_type_main-default ml-2 " +
  (isActive ? styles["menu__item_active"] : styles["menu__item"]);

const buttonType = (link: string, active: string) => {
  if (active === link) return "primary";
  return "secondary";
};

export function NavLinkWithIcon({ url, pathname, text, iconType }: TProps) {
  let Icon = <></>;

  switch (iconType) {
    case "home":
      Icon = <BurgerIcon type={buttonType(url, pathname)} />;
      break;
    case "feed":
      Icon = <ListIcon type={buttonType(url, pathname)} />;
      break;
    case "profile":
      Icon = <ProfileIcon type={buttonType(url, pathname)} />;
      break;
  }

  return (
    <>
      {Icon}
      <NavLink className={setActive} to={url} state={{ from: pathname }} end>
        {text}
      </NavLink>
    </>
  );
}
