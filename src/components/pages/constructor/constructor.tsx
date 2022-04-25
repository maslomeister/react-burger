import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import BurgerConstructor from "../../../components/burger-constructor/burger-constructor";
import { BurgerIngredientsMemoized } from "../../../components/burger-ingredients/burger-ingredients";

import styles from "./constructor.module.css";

export function Constructor() {
  return (
    <section className={styles["row"]}>
      <DndProvider backend={HTML5Backend}>
        <div className={`mr-10`}>
          <BurgerIngredientsMemoized />
        </div>
        <div>
          <BurgerConstructor />
        </div>
      </DndProvider>
    </section>
  );
}
