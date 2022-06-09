import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { motion } from "framer-motion";

import { BurgerIngredientsMemoized } from "../../components/burger-ingredients/burger-ingredients";
import { BurgerConstructorWrapperMemoized } from "./components/burger-constructor-wrapper/burger-constructor-wrapper";

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
      className="row"
    >
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredientsMemoized />
        <BurgerConstructorWrapperMemoized />
      </DndProvider>
    </motion.div>
  );
}
