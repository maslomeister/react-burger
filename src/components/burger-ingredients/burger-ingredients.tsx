import { memo, useRef, useMemo, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import BurgerIngredientItem from "./components/burger-ingredients-item/burger-ingredients-item";
import Tabs from "../../utils/tabs-data";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import BurgerIngredientsTabs from "./components/burger-ingredients-tabs/burger-ingredients-tabs";
import {
  addDataToModal,
  resetModalData,
} from "../services/reducers/ingredient-details";

import ingredientsStyles from "./burger-ingredients.module.css";

function BurgerIngredients() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const tabsRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const ingredients = useAppSelector(
    (state) => state.burgerIngredients.ingredients
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

  const modalData = useCallback(
    (ingredient) => {
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
      setShowModal(true);
    },
    [dispatch]
  );

  const removeDataFromModal = useCallback(() => {
    dispatch(resetModalData());
    setShowModal(false);
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
                    onClick={() => modalData(ingredient)}
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
