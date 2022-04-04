import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { useAppDispatch, useAppSelector } from "./hooks";
import AppHeader from "../../components/app-header/app-header";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import { fetchIngredients } from "../services/reducers/burger-ingredients";

import appStyles from "./app.module.css";

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
      <div className={appStyles["loading"]}>
        <p className="text text_type_main-large">Данные загружаются</p>
      </div>
    );
  } else if (status === "succeeded") {
    content = (
      <section className={appStyles["row"]}>
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
      <div className={appStyles["loading"]}>
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
        <Route path="/" element={content} />
        <Route path="/orders" element={<></>} />
        <Route path="/account" element={<></>} />
      </Routes>
    </div>
  );
}

export default App;
