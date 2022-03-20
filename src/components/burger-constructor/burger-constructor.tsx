import { useState } from "react";
import PropTypes from "prop-types";

import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../../components/order-details/order-details";

import constructorStyles from "./burger-constructor.module.css";

const ingredient = PropTypes.shape({
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
  ingredients: PropTypes.arrayOf(ingredient.isRequired),
  ingredient,
};

BurgerConstructor.propTypes = propTypes;

//Используется для того чтобы TS автоматически получил типы которые мы указали через prop-types
type BurgerConstructorPropTypes = PropTypes.InferProps<typeof propTypes>;

function BurgerConstructor(props: BurgerConstructorPropTypes) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <OrderDetails onClose={() => setShowModal(false)} show={showModal} />
      {props.ingredients && (
        <div className="mt-25">
          <div className={constructorStyles["outer_style"]}>
            <div className="ml-4 mr-4 mb-4">
              <div className={constructorStyles["constructor-element-wrapper"]}>
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={`${props.ingredients[0].name} (верх)`}
                  price={props.ingredients[0].price}
                  thumbnail={props.ingredients[0].image}
                />
              </div>
            </div>
          </div>

          <div className={constructorStyles["inner_style"]}>
            {props.ingredients.map((ingredient, index) => {
              if (ingredient.type !== "bun") {
                const lastIndex = props.ingredients!.length - 1;
                return (
                  <div
                    key={ingredient._id}
                    className={`${constructorStyles["ingredient"]} ml-4 mr-4 ${
                      lastIndex !== index ? "mb-4" : ""
                    }`}
                  >
                    <DragIcon type="primary" />

                    <div
                      className={
                        constructorStyles["constructor-element-wrapper"]
                      }
                    >
                      <ConstructorElement
                        text={ingredient.name}
                        price={ingredient.price}
                        thumbnail={ingredient.image}
                      />
                    </div>
                  </div>
                );
              }

              return null;
            })}
          </div>

          <div className={constructorStyles["outer_style"]}>
            <div className="ml-4 mr-4 mt-4">
              <div className={constructorStyles["constructor-element-wrapper"]}>
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={`${props.ingredients[0].name} (низ)`}
                  price={props.ingredients[0].price}
                  thumbnail={props.ingredients[0].image}
                />
              </div>
            </div>
          </div>

          <div className={`${constructorStyles["cart"]} mt-10`}>
            <div className={`${constructorStyles["cart__total"]} mr-10`}>
              <p className="text text_type_digits-medium">500</p>
              <CurrencyIcon type="primary" />
            </div>
            <Button
              type="primary"
              size="large"
              onClick={() => setShowModal(true)}
            >
              Оформить заказ
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default BurgerConstructor;
