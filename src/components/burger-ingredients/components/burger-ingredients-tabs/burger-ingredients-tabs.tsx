import React, { memo, useEffect, useRef, useState, useCallback } from "react";
import scrollIntoView from "smooth-scroll-into-view-if-needed";
import { Tabs } from "../../../../utils/tabs-data";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-ingredients-tabs.module.css";

interface TabsTypes {
  tabsRef: React.RefObject<HTMLDivElement>;
}

function BurgerIngredientsTabs({ tabsRef }: TabsTypes) {
  const _tabsRef = tabsRef;

  const [tabState, setTabState] = useState("one");

  const [isScrolling, _setIsScrolling] = useState(false);
  const isScrollingRef = useRef(isScrolling);

  const setIsScrolling = (data: boolean) => {
    isScrollingRef.current = data;
    _setIsScrolling(data);
  };

  const scrollIntoViewAsync = async (scrollTo: Element) => {
    setIsScrolling(true);
    scrollIntoView(scrollTo, {
      behavior: "smooth",
      block: "start",
    }).then(() => {
      setIsScrolling(false);
    });
  };

  const scrollTabIntoView = (value: string) => {
    const { current } = _tabsRef;

    if (current) {
      const [firstTab, secondTab, thirdTab] = [
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
          scrollIntoViewAsync(thirdTab);
          break;
      }
    }
  };

  const catchScroll = useCallback(() => {
    const { current } = _tabsRef;

    if (current && !isScrollingRef.current) {
      const firstTabTop = current.children[0].getBoundingClientRect().top;

      if (firstTabTop > 30 && firstTabTop <= 300) {
        return setTabState("one");
      } else if (firstTabTop > -500 && firstTabTop <= 30) {
        return setTabState("two");
      } else if (firstTabTop <= -500) {
        return setTabState("three");
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
    setTabState(value);
    scrollTabIntoView(value);
  };

  return (
    <div className={`${styles["tabs"]} mb-10`}>
      {Tabs.map((tab) => (
        <div className={styles["tab-wrapper"]} key={tab._id}>
          <Tab
            value={tab.value}
            active={tabState === tab.value}
            onClick={onTabClick}
          >
            {tab.name}
          </Tab>
        </div>
      ))}
    </div>
  );
}

export const BurgerIngredientsTabsMemoized = memo(BurgerIngredientsTabs);
