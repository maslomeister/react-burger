import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";

import { BurgerIngredientsMemoized } from "../../components/burger-ingredients/burger-ingredients";
import { BurgerConstructorWrapperMemoized } from "./components/burger-constructor-wrapper/burger-constructor-wrapper";
import { CustomPreview } from "./components/custom-preview/custom-preview";

export function Constructor() {
  const isMobile = useMediaQuery({ query: "(max-width: 1023px)" });
  return (
    <motion.div
      key="constructor-page"
      initial={{ x: "-100%" }}
      animate={{
        x: "0",
        transitionEnd: {
          x: "unset",
        },
      }}
      exit={{ x: "-100%" }}
      transition={{
        type: "ease-in-out",
      }}
      className="row"
      id="ingredients-row"
    >
      <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
        <BurgerIngredientsMemoized />
        <BurgerConstructorWrapperMemoized />
        {isMobile && <CustomPreview />}
      </DndProvider>
    </motion.div>
  );
}
