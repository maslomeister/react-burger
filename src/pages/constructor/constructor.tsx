import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import { BurgerIngredientsMemoized } from "../../components/burger-ingredients/burger-ingredients";
import { MobileCart } from "./components/mobile-cart/mobile-cart";

export function Constructor() {
  const isMobileOrTablet = useMediaQuery({ query: "(max-width: 1024px)" });

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
        {isMobileOrTablet ? <MobileCart /> : <BurgerConstructor />}
      </DndProvider>
    </motion.div>
  );
}
