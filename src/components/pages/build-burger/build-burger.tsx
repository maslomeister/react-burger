import buildStyles from "./build-burger.module.css";
import BurgerConstructor from "../../burger-constructor/burger-constructor";
import BurgerIngredients from "../../burger-ingredients/burger-ingredients";
import Data from "../../../utils/data";
import Tabs from "../../../utils/tabs-data";

function BuildBurger() {
  return (
    <section className={buildStyles.row}>
      <div className={`{buildStyles.col_left} mr-10`}>
        <BurgerIngredients tabs={Tabs} dataArray={Data} />
      </div>
      <div className={buildStyles.col_right}>
        <BurgerConstructor
          dataArray={Data!}
          topBun={Data[0]}
          bottomBun={Data[Data.length - 1]}
        />
      </div>
    </section>
  );
}

export default BuildBurger;
