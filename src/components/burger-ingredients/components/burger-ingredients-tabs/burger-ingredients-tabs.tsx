import React, { memo, useEffect, useRef, useState, useCallback } from "react";
import scrollIntoView from "smooth-scroll-into-view-if-needed";
import Tabs from "../../../../utils/tabs-data";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-ingredients-tabs.module.css";

interface TabsTypes {
  tabsRef: React.RefObject<HTMLDivElement>;
}

function BurgerIngredientsTabs({ tabsRef }: TabsTypes) {
  const _tabsRef = tabsRef;

  const [state, setState] = useState({
    currentTab: "one",
  });

  const [isScrolling, _setIsScrolling] = useState(false);
  const isScrollingRef = useRef(isScrolling);

  const setIsScrolling = (data: boolean) => {
    isScrollingRef.current = data;
    _setIsScrolling(data);
  };

  const scrollIntoViewAsync = async (scroolTo: Element) => {
    setIsScrolling(true);
    scrollIntoView(scroolTo, {
      behavior: "smooth",
      block: "start",
    }).then(() => {
      setIsScrolling(false);
    });
  };

  const scrollTabIntoView = (value: string) => {
    const { current } = _tabsRef;

    if (current) {
      const [firstTab, secondTab, thidTab] = [
        current.children[0],
        current.children[1],
        current.children[2],
      ];

      switch (value) {
        case "one":
          scrollIntoViewAsync(firstTab);
          break;

        case "two":
          scrollIntoViewAsync(secondTab);
          break;

        case "three":
          scrollIntoViewAsync(thidTab);
          break;
      }
    }
  };

  const catchScroll = useCallback(() => {
    const { current } = _tabsRef;

    if (current && !isScrollingRef.current) {
      const firstTabTop = current.children[0].getBoundingClientRect().top;

      if (firstTabTop > 30 && firstTabTop <= 300) {
        return setState((prevState) => ({
          ...prevState,
          currentTab: "one",
        }));
      } else if (firstTabTop > -500 && firstTabTop <= 30) {
        return setState((prevState) => ({
          ...prevState,
          currentTab: "two",
        }));
      } else if (firstTabTop <= -500) {
        return setState((prevState) => ({
          ...prevState,
          currentTab: "three",
        }));
      }
    }
  }, [_tabsRef]);

  useEffect(() => {
    const { current } = _tabsRef;
    current?.addEventListener("scroll", catchScroll);
    return () => {
      current?.removeEventListener("scroll", catchScroll);
    };
  }, [_tabsRef, catchScroll]);

  const onTabClick = (value: string) => {
    setState((prevState) => ({
      ...prevState,
      currentTab: value,
    }));
    scrollTabIntoView(value);
  };

  return (
    <nav>
      <ul className={`${styles["tabs"]} mb-10`}>
        {Tabs.map((tab) => (
          <Tab
            key={tab._id}
            value={tab.value}
            active={state.currentTab === tab.value}
            onClick={() => onTabClick(tab.value)}
          >
            {tab.name}
          </Tab>
        ))}
      </ul>
    </nav>
  );
}

export default memo(BurgerIngredientsTabs);
