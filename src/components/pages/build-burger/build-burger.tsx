import buildStyles from "./build-burger.module.css";
import BurgerIngredients from "../../burger-constructor/burger-constructor";
import BurgerConstructor from "../../burger-ingredients/burger-ingredients";

function BuildBurger() {
  return (
    <section className={buildStyles.row}>
      <div className={`{buildStyles.col_left} mr-10`}>
        <BurgerConstructor />
      </div>
      <div className={buildStyles.col_right}>
        <BurgerIngredients />
      </div>
    </section>
  );
}

export default BuildBurger;
