import { memo, useRef, useMemo, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { BurgerIngredientItemMemoized } from "./components/burger-ingredients-item/burger-ingredients-item";
import { Tabs } from "../../utils/tabs-data";
import { useAppSelector, useAppDispatch } from "../../services/hooks";
import { BurgerIngredientsTabsMemoized } from "./components/burger-ingredients-tabs/burger-ingredients-tabs";
import { addDataToModal } from "../../services/reducers/ingredient-details/ingredient-details";

import styles from "./burger-ingredients.module.css";

interface CounterType extends Record<string, any> {
  id?: number;
}

function BurgerIngredients() {
  const tabsRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation() as TLocationProps;

  const ingredients = useAppSelector(
    (state) => state.burgerIngredients.ingredients
  );

  const constructorIngredients = useAppSelector(
    (state) => state.constructorIngredients
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

  useEffect(() => {
    if (location.state && location.state.id) {
      const ingredient = ingredients.find(
        (_ingredient) => _ingredient._id === location.state.id
      );
      if (ingredient) {
        const modalData = {
          modalImage: ingredient.image_large,
          modalName: ingredient.name,
          modalCalories: ingredient.calories,
          modalProteins: ingredient.price,
          modalFat: ingredient.fat,
          modalCarbohydrates: ingredient.carbohydrates,
        };
        dispatch(addDataToModal(modalData));
      }
    }
  }, [dispatch, ingredients, location.state]);

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
      navigate(`/ingredients/${ingredient._id}`, {
        state: { background: location, id: ingredient._id },
      });
      const modalData = {
        modalImage: ingredient.image_large,
        modalName: ingredient.name,
        modalCalories: ingredient.calories,
        modalProteins: ingredient.price,
        modalFat: ingredient.fat,
        modalCarbohydrates: ingredient.carbohydrates,
      };
      dispatch(addDataToModal(modalData));
    },
    [dispatch, location, navigate]
  );

  const ingredientsCategories = [buns, sauces, mains];
  return (
    <div className={styles["ingredients-container"]} id="ingredients-container">
      <div className={styles["ingredients"]}>
        <p
          className={`${styles["ingredients__title"]} text text_type_main-large mb-5 mt-10`}
        >
          Соберите бургер
        </p>
        <BurgerIngredientsTabsMemoized tabsRef={tabsRef} />

        <div className={styles["components"]} ref={tabsRef}>
          {Tabs.map((tab, index) => (
            <section key={tab._id} className={`${tab._id}`}>
              <p
                className={`${styles["ingredients__tab__title"]} text text_type_main-medium`}
              >
                {tab.name}
              </p>
              <div className={styles["item-container"]}>
                {ingredientsCategories[index].map((ingredient) => (
                  <BurgerIngredientItemMemoized
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
      </div>
    </div>
  );
}

export const BurgerIngredientsMemoized = memo(BurgerIngredients);
