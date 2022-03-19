import { useEffect, useState } from "react";
import constructorStyles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import OrderDetails from "../../components/order-details/order-details";

const dataPropTypes = PropTypes.shape({
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

const bottomBun = dataPropTypes;

const topBun = dataPropTypes;

const propTypes = {
  ref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  dataArray: PropTypes.arrayOf(dataPropTypes.isRequired),
  topBun,
  bottomBun,
};

BurgerConstructor.propTypes = propTypes;

//Используется для того чтобы TS автоматически получил типы которые мы указали через prop-types
type burgerConstructorPropTypes = PropTypes.InferProps<typeof propTypes>;

function BurgerConstructor(props: burgerConstructorPropTypes) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const elements = Array.from(
      document.getElementsByClassName(
        "constructor-element"
      ) as HTMLCollectionOf<HTMLElement>
    );

    elements.map((element) => {
      return (element.style.width = "488px");
    });
  }, [props.dataArray]);

  return (
    <>
      <OrderDetails onClose={() => setShowModal(!showModal)} show={showModal} />
      {props.dataArray && (
        <div className="mt-25">
          <div className={constructorStyles.outer_style}>
            <div className="ml-4 mr-4 mb-4">
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${props.dataArray[0].name} (верх)`}
                price={props.dataArray[0].price}
                thumbnail={props.dataArray[0].image}
              />
            </div>
          </div>

          <div className={constructorStyles.inner_style}>
            {props.dataArray.map((data, index) => {
              if (data.type !== "bun") {
                const lastIndex = props.dataArray!.length - 2;
                if (index === lastIndex) {
                  return (
                    <div
                      key={index}
                      className={`${constructorStyles.ingredient} ml-4 mr-4`}
                    >
                      <DragIcon type="primary" />

                      <ConstructorElement
                        text={data.name}
                        price={data.price}
                        thumbnail={data.image}
                      />
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={index}
                      className={`${constructorStyles.ingredient} ml-4 mr-4 mb-4`}
                    >
                      <DragIcon type="primary" />

                      <ConstructorElement
                        text={data.name}
                        price={data.price}
                        thumbnail={data.image}
                      />
                    </div>
                  );
                }
              }

              return null;
            })}
          </div>

          <div className={constructorStyles.outer_style}>
            <div className="ml-4 mr-4 mt-4">
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${props.dataArray[0].name} (низ)`}
                price={props.dataArray[0].price}
                thumbnail={props.dataArray[0].image}
              />
            </div>
          </div>

          <div className={`${constructorStyles.cart} mt-10`}>
            <div className={`${constructorStyles.total} mr-10`}>
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
