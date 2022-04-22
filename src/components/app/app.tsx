import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AnimatePresence } from "framer-motion";

import { useAppDispatch, useAppSelector } from "../../services/hooks";
import AppHeader from "../../components/app-header/app-header";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import { fetchIngredients } from "../../services/burger-ingredients";
import AnimatedLoading from "../animated-loading/animated-loading";

import styles from "./app.module.css";

function App() {
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
      <div className={styles["loading"]}>
        <p className="text text_type_main-large">Данные загружаются</p>
        <AnimatePresence>
          <AnimatedLoading />
        </AnimatePresence>
      </div>
    );
  } else if (status === "succeeded") {
    content = (
      <section className={styles["row"]}>
        <DndProvider backend={HTML5Backend}>
          <div className={`mr-10`}>
            <BurgerIngredients />
          </div>
          <div>
            <BurgerConstructor />
          </div>
        </DndProvider>
      </section>
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

  return (
    <div className="App">
      <AppHeader />
      <Routes>
        <Route path="/" element={<>{content}</>} />
        <Route path="/orders" element={<></>} />
        <Route path="/account" element={<></>} />
      </Routes>
    </div>
  );
}

export default App;
