import itemStyles from "./burger-constructor-item.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface Props {
  imageSrc: string;
  name: string;
  price: number;
}

function BurgerConstructorItem(props: Props) {
  return (
    <div className={`${itemStyles.item} ml-4 mr-5 mb-10 mt-6`}>
      <img
        className={`${itemStyles.item} ml-4 mr-5`}
        alt="previewImage"
        src={props.imageSrc}
      />
      <div className={`${itemStyles.price} mb-1 mt-1`}>
        <p className="text text_type_digits-small">{props.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${itemStyles.name} text text_type_main-small`}>
        {props.name}
      </p>
    </div>
  );
}

export default BurgerConstructorItem;
