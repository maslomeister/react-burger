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

const DataPropTypes = PropTypes.shape({
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
  dataArray: PropTypes.arrayOf(DataPropTypes.isRequired),
};

BurgerConstructor.propTypes = propTypes;

//Используется для того чтобы TS автоматически получил типы которые мы указали через prop-types
type BurgerConstructorPropTypes = PropTypes.InferProps<typeof propTypes>;

function BurgerConstructor(props: BurgerConstructorPropTypes) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <OrderDetails onClose={() => setShowModal(false)} show={showModal} />
      {props.dataArray && (
        <div className="mt-25">
          <div className={constructorStyles.outer_style}>
            <div className="ml-4 mr-4 mb-4">
              <div className={constructorStyles.constructor_element_wrapper}>
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={`${props.dataArray[0].name} (верх)`}
                  price={props.dataArray[0].price}
                  thumbnail={props.dataArray[0].image}
                />
              </div>
            </div>
          </div>

          <div className={constructorStyles.inner_style}>
            {props.dataArray.map((data, index) => {
              if (data.type !== "bun") {
                const lastIndex = props.dataArray!.length - 1;
                if (index === lastIndex) {
                  return (
                    <div
                      key={data._id}
                      className={`${constructorStyles.Ingredient} ml-4 mr-4`}
                    >
                      <DragIcon type="primary" />

                      <div
                        className={
                          constructorStyles.constructor_element_wrapper
                        }
                      >
                        <ConstructorElement
                          text={data.name}
                          price={data.price}
                          thumbnail={data.image}
                        />
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={data._id}
                      className={`${constructorStyles.Ingredient} ml-4 mr-4 mb-4`}
                    >
                      <DragIcon type="primary" />
                      <div
                        className={
                          constructorStyles.constructor_element_wrapper
                        }
                      >
                        <ConstructorElement
                          text={data.name}
                          price={data.price}
                          thumbnail={data.image}
                        />
                      </div>
                    </div>
                  );
                }
              }

              return null;
            })}
          </div>

          <div className={constructorStyles.outer_style}>
            <div className="ml-4 mr-4 mt-4">
              <div className={constructorStyles.constructor_element_wrapper}>
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={`${props.dataArray[0].name} (низ)`}
                  price={props.dataArray[0].price}
                  thumbnail={props.dataArray[0].image}
                />
              </div>
            </div>
          </div>

          <div className={`${constructorStyles.Cart} mt-10`}>
            <div className={`${constructorStyles.Cart_total} mr-10`}>
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
