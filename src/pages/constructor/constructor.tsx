import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { motion } from "framer-motion";

import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import { BurgerIngredientsMemoized } from "../../components/burger-ingredients/burger-ingredients";

export function Constructor() {
  return (
    <motion.div
      key="constructor-page"
      initial={{ x: "-100%" }}
      animate={{ x: "0" }}
      exit={{ x: "-100%" }}
      transition={{
        type: "ease-in-out",
      }}
    >
      <section className={"row"}>
        <DndProvider backend={HTML5Backend}>
          <div className={`mr-10`}>
            <BurgerIngredientsMemoized />
          </div>
          <div>
            <BurgerConstructor />
          </div>
        </DndProvider>
      </section>
    </motion.div>
  );
}
