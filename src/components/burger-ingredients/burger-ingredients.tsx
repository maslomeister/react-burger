import { memo, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import BurgerIngredientItem from "./components/burger-ingredients-item/burger-ingredients-item";
import Tabs from "../../utils/tabs-data";
import { useAppSelector, useAppDispatch } from "../../services/hooks";
import BurgerIngredientsTabs from "./components/burger-ingredients-tabs/burger-ingredients-tabs";
import {
  addDataToModal,
  resetModalData,
} from "../../services/ingredient-details";

import ingredientsStyles from "./burger-ingredients.module.css";

interface CounterType extends Record<string, any> {
  id?: number;
}

function BurgerIngredients() {
  const tabsRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const ingredients = useAppSelector(
    (state) => state.burgerIngredients.ingredients
  );

  const constructorIngredients = useAppSelector(
    (state) => state.constructorIngredients
  );

  const showModal = useAppSelector(
    (state) => state.ingredientDetails.showModal
  );

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

  const ingredientsCounter = useMemo(() => {
    const { bun, ingredients } = constructorIngredients;
    const counters: CounterType = {};
    ingredients.forEach((ingredient) => {
      if (!counters[ingredient._id]) counters[ingredient._id] = 0;
      counters[ingredient._id]++;
    });
    if (bun) counters[bun._id] = 2;
    return counters;
  }, [constructorIngredients]);

  const modalData = useCallback(
    (ingredient) => () => {
      dispatch(
        addDataToModal({
          modalImage: ingredient.image_large,
          modalName: ingredient.name,
          modalCalories: ingredient.calories,
          modalProteins: ingredient.price,
          modalFat: ingredient.fat,
          modalCarbohydrates: ingredient.carbohydrates,
        })
      );
    },
    [dispatch]
  );

  const removeDataFromModal = useCallback(() => {
    dispatch(resetModalData());
  }, [dispatch]);

  const ingredientsCategories = [buns, sauces, mains];
  return (
    <AnimatePresence>
      {showModal && (
        <IngredientDetails
          onClose={() => removeDataFromModal()}
          key="burger-details-modal"
        />
      )}

      <motion.div
        key="burger-ingredients"
        initial={{ x: "-200%" }}
        animate={{ x: 0 }}
        transition={{
          type: "tween",
        }}
      >
        <p className="text text_type_main-large mb-5 mt-10">Соберите бургер</p>
        <BurgerIngredientsTabs tabsRef={tabsRef} />

        <div className={ingredientsStyles["components"]} ref={tabsRef}>
          {Tabs.map((tab, index) => (
            <section key={tab._id} className={`${tab._id}`}>
              <p className="text text_type_main-medium">{tab.name}</p>
              <div className={`${ingredientsStyles["item-container"]} ml-4`}>
                {ingredientsCategories[index].map((ingredient) => (
                  <BurgerIngredientItem
                    key={ingredient._id}
                    ingredient={ingredient}
                    onClick={modalData(ingredient)}
                    counter={ingredientsCounter[ingredient._id]}
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

export default memo(BurgerIngredients);
