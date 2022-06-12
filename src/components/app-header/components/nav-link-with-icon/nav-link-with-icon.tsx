import React from "react";
import { NavLink } from "react-router-dom";

import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { setActiveHelper, iconTypeHelper } from "../../../../utils/helpers";

import styles from "./nav-link-with-icon.module.css";

type TProps = {
  url: string;
  pathname: string;
  text: string;
  iconType: "home" | "feed" | "profile";
  end?: boolean;
};

export function NavLinkWithIcon({
  url,
  pathname,
  text,
  iconType,
  end,
}: TProps) {
  let Icon = <></>;

  switch (iconType) {
    case "home":
      Icon = (
        <BurgerIcon
          type={iconTypeHelper(url, pathname, "primary", "secondary", end)}
        />
      );
      break;
    case "feed":
      Icon = (
        <ListIcon
          type={iconTypeHelper(url, pathname, "primary", "secondary", end)}
        />
      );
      break;
    case "profile":
      Icon = (
        <ProfileIcon
          type={iconTypeHelper(url, pathname, "primary", "secondary", end)}
        />
      );
      break;
  }

  return (
    <>
      {Icon}

      <NavLink
        className={({ isActive }) =>
          `text text_type_main-default ml-2 ${setActiveHelper(
            isActive,
            styles["menu__item_active"],
            styles["menu__item"]
          )}`
        }
        to={url}
        state={{ from: pathname }}
        end
      >
        {text}
      </NavLink>
    </>
  );
}
