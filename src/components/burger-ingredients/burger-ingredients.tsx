import ingredientsStyles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import Data from "../../utils/data";
import Tabs from "../../utils/tabs-data";
import BurgerIngredientItem from "../burger-ingredients-item/burger-ingredients-item";

function BurgerIngredient() {
  const [currentTab, setCurrentTab] = useState("one");

  return (
    <>
      <p className="text text_type_main-large mb-5 mt-10">Соберите бургер</p>
      <div className="mb-10" style={{ display: "flex" }}>
        {Tabs.map((tab) => (
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

      <div className={ingredientsStyles.components}>
        {Tabs.map((tab) => (
          <section key={tab._id}>
            <p className="text text_type_main-medium">{tab.name}</p>
            <div className={`${ingredientsStyles.item_container} ml-4`}>
              {Data.filter((x) => x.type === tab.type).map((data) => (
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
    </>
  );
}

export default BurgerIngredient;
