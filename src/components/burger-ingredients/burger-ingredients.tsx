import ingredientsStyles from "./burger-ingredients.module.css";
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Data from "../../utils/data";

function BurgerIngredients() {
  return (
    <div className="mt-25">
      <div className={ingredientsStyles.outer_ingredient}>
        <div className="ml-4 mr-4 mb-4">
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={Data[0].image}
          />
        </div>
      </div>

      <div className={ingredientsStyles.inner_ingredients}>
        {Data.map((data) => {
          return (
            <div className="ml-4 mr-4 mb-4">
              <DragIcon type="primary" />
              <ConstructorElement
                text="Краторная булка N-200i (верх)"
                price={200}
                thumbnail={data.image}
              />
            </div>
          );
        })}
      </div>

      <div className={ingredientsStyles.outer_ingredient}>
        <div className="ml-4 mr-4 mt-4">
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={Data[0].image}
          />
        </div>
      </div>

      <div className={`${ingredientsStyles.cart} mt-10`}>
        <div className={`${ingredientsStyles.total} mr-10`}>
          <p className="text text_type_digits-medium">500</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}

export default BurgerIngredients;
