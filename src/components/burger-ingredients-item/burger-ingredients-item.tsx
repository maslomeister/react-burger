import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

import itemStyles from "./burger-ingredients-item.module.css";

interface BurgerIngredientPropTypes {
  imageSrc: string;
  name: string;
  price: number;
  onClick: () => void;
}

function BurgerIngredientItem(props: BurgerIngredientPropTypes) {
  return (
    <div
      className={`${itemStyles.Item} ml-4 mr-5 mb-10 mt-6`}
      onClick={props.onClick}
    >
      <img
        className={`${itemStyles.Item} ml-4 mr-5`}
        alt="previewImage"
        src={props.imageSrc}
      />
      <div className={`${itemStyles.Item_price} mb-1 mt-1`}>
        <p className="text text_type_digits-small mr-2">{props.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${itemStyles.Item_name} text text_type_main-small`}>
        {props.name}
      </p>
      <Counter count={1} size="default" />
    </div>
  );
}

export default BurgerIngredientItem;
