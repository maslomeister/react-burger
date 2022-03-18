import ingredientsStyles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import BurgerIngredientItem from "../burger-ingredients-item/burger-ingredients-item";
import PropTypes from "prop-types";

const tab = PropTypes.shape({
  _id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
});

const data = PropTypes.shape({
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
  dataArray: PropTypes.arrayOf(data.isRequired),
  data,
  tabs: PropTypes.arrayOf(tab.isRequired),
  tab,
};

BurgerIngredient.propTypes = propTypes;

//Используется для того чтобы TS автоматически получил типы которые мы указали через prop-types
type burgerIngredientsPropTypes = PropTypes.InferProps<typeof propTypes>;

function BurgerIngredient(props: burgerIngredientsPropTypes) {
  const [currentTab, setCurrentTab] = useState("one");

  return (
    <>
      <p className="text text_type_main-large mb-5 mt-10">Соберите бургер</p>
      <div className={`${ingredientsStyles.tabs} mb-10`}>
        {props.tabs!.map((tab) => (
          <Tab
            key={tab._id}
            value={tab.value}
            active={currentTab === tab.value}
            onClick={setCurrentTab}
          >
            {tab.name}
          </Tab>
        ))}
      </div>

      {props.dataArray && (
        <div className={ingredientsStyles.components}>
          {props.tabs!.map((tab) => (
            <section key={tab._id}>
              <p className="text text_type_main-medium">{tab.name}</p>
              <div className={`${ingredientsStyles.item_container} ml-4`}>
                {props
                  .dataArray!.filter((data) => data.type === tab.type)
                  .map((data) => (
                    <BurgerIngredientItem
                      key={data._id}
                      imageSrc={data.image}
                      price={data.price}
                      name={data.name}
                    />
                  ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </>
  );
}

export default BurgerIngredient;
