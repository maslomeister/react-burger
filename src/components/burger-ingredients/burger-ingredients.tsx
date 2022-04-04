import { memo, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

import IngredientDetails from "../../components/ingredient-details/ingredient-details";

import { useAppSelector, useAppDispatch } from "../services/hooks";
import BurgerIngredientsTabs from "./components/burger-ingredients-tabs/burger-ingredients-tabs";
import BurgerIngredientsItems from "./components/burger-ingredients-items/burger-ingredients-items";
import { resetModalData } from "../services/reducers/ingredient-details";

import ingredientsStyles from "./burger-ingredients.module.css";

function BurgerIngredients() {
  const tabsRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const showModal = useAppSelector(
    (state) => state.ingredientDetails.showModal
  );

  const removeDataFromModal = useCallback(() => {
    dispatch(resetModalData());
  }, [dispatch]);

  return (
    <AnimatePresence>
      {showModal && <IngredientDetails onClose={() => removeDataFromModal()} />}

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
          <BurgerIngredientsItems />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default memo(BurgerIngredients);
