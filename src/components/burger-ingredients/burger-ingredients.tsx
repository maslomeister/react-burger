import React, { useState, useRef, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientItem from "./components/burger-ingredients-item/burger-ingredients-item";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import scrollIntoView from "smooth-scroll-into-view-if-needed";
import Tabs from "../../utils/tabs-data";

import ingredientsStyles from "./burger-ingredients.module.css";

const data = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired,
});

const propTypes = {
  ingredients: PropTypes.arrayOf(data.isRequired).isRequired,
  data,
};

BurgerIngredients.propTypes = propTypes;

//Используется для того чтобы TS автоматически получил типы которые мы указали через prop-types
type BurgerIngredientsPropTypes = PropTypes.InferProps<typeof propTypes>;

function BurgerIngredients({ ingredients }: BurgerIngredientsPropTypes) {
  const tabsRef = useRef<HTMLDivElement>(null);

  const buns = useMemo(
    () => ingredients.filter((ingredient) => ingredient.type === "bun"),
    [ingredients]
  );

  const mains = useMemo(
    () => ingredients.filter((ingredient) => ingredient.type === "main"),
    [ingredients]
  );

  const sauces = useMemo(
    () => ingredients.filter((ingredient) => ingredient.type === "sauce"),
    [ingredients]
  );

  const ingredientsCategories = [buns, sauces, mains];

  const [state, setState] = useState({
    modalShow: false,
    modalImage: "",
    modalName: "",
    modalCalories: 0,
    modalProteins: 0,
    modalFat: 0,
    modalCarbohydrates: 0,
    currentTab: "one",
    scrollToTab: "one",
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
    const { current } = tabsRef;

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

  const catchScroll = () => {
    const { current } = tabsRef;

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
  };

  useEffect(() => {
    const { current } = tabsRef;
    current?.addEventListener("scroll", catchScroll);
    return () => {
      current?.removeEventListener("scroll", catchScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {state.modalShow && (
        <IngredientDetails
          onClose={() =>
            setState((prevState) => ({
              ...prevState,
              modalShow: false,
            }))
          }
          imageSrc={state.modalImage}
          name={state.modalName}
          calories={state.modalCalories}
          proteins={state.modalProteins}
          fat={state.modalFat}
          carbohydrates={state.modalCarbohydrates}
        />
      )}
      <motion.div
        key="modal"
        initial={{ x: "-200%" }}
        animate={{ x: 0 }}
        transition={{
          type: "tween",
        }}
      >
        <p className="text text_type_main-large mb-5 mt-10">Соберите бургер</p>
        <nav>
          <ul className={`${ingredientsStyles["tabs"]} mb-10`}>
            {Tabs.map((tab) => (
              <Tab
                key={tab._id}
                value={tab.value}
                active={state.currentTab === tab.value}
                onClick={() => {
                  setState((prevState) => ({
                    ...prevState,
                    currentTab: tab.value,
                  }));
                  scrollTabIntoView(tab.value);
                }}
              >
                {tab.name}
              </Tab>
            ))}
          </ul>
        </nav>

        <div className={ingredientsStyles["components"]} ref={tabsRef}>
          {Tabs.map((tab, index) => (
            <section key={tab._id} className={`${tab._id}`}>
              <p className="text text_type_main-medium">{tab.name}</p>
              <div className={`${ingredientsStyles["item-container"]} ml-4`}>
                {ingredientsCategories[index].map((data) => (
                  <BurgerIngredientItem
                    key={data._id}
                    imageSrc={data.image_large}
                    price={data.price}
                    name={data.name}
                    onClick={() =>
                      setState((prevState) => ({
                        ...prevState,
                        modalShow: !state.modalShow,
                        modalImage: data.image_large,
                        modalName: data.name,
                        modalCalories: data.calories,
                        modalProteins: data.proteins,
                        modalFat: data.fat,
                        modalCarbohydrates: data.carbohydrates,
                      }))
                    }
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default BurgerIngredients;
