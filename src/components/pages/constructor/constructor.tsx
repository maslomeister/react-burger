import { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { motion } from "framer-motion";

import { useAppDispatch, useAppSelector } from "../../../services/hooks";
import { fetchIngredients } from "../../../services/burger-ingredients";
import BurgerConstructor from "../../../components/burger-constructor/burger-constructor";
import { BurgerIngredientsMemoized } from "../../../components/burger-ingredients/burger-ingredients";
import { LoadingScreen } from "../../loading-screen/loading-screen";

import styles from "./constructor.module.css";

export function Constructor() {
  const dispatch = useAppDispatch();

  const { status, error } = useAppSelector((state) => state.burgerIngredients);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchIngredients());
    }
  }, [status, dispatch]);

  let content;

  if (status === "loading") {
    content = (
      <LoadingScreen text={"Загружаются данные конструктора"} size={"medium"} />
    );
  } else if (status === "succeeded") {
    content = (
      <motion.div
        key="burger-constructor"
        initial={{ y: "-200%" }}
        exit={{ x: "-200%" }}
        animate={{ y: 0 }}
        transition={{
          type: "tween",
        }}
      >
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
      </motion.div>
    );
  } else if (status === "failed") {
    content = (
      <div className={styles["loading"]}>
        <p className="text text_type_main-large">
          Данные не смогли загрузиться: {error}
        </p>
      </div>
    );
  }
  return <>{content}</>;
}
