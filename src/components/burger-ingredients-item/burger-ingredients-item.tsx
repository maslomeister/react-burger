import itemStyles from "./burger-ingredients-item.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const propTypes = {
  imageSrc: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

BurgerIngredientItem.propTypes = propTypes;

//Используется для того чтобы TS автоматически получил типы которые мы указали через prop-types
type burgerIngredientsPropTypes = PropTypes.InferProps<typeof propTypes>;

function BurgerIngredientItem(props: burgerIngredientsPropTypes) {
  return (
    <div className={`${itemStyles.item} ml-4 mr-5 mb-10 mt-6`}>
      <img
        className={`${itemStyles.item} ml-4 mr-5`}
        alt="previewImage"
        src={props.imageSrc}
      />
      <div className={`${itemStyles.price} mb-1 mt-1`}>
        <p className="text text_type_digits-small mr-2">{props.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${itemStyles.name} text text_type_main-small`}>
        {props.name}
      </p>
      <Counter count={1} size="default" />
    </div>
  );
}

export default BurgerIngredientItem;
