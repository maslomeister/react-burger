import { useState, useEffect } from "react";

import AppHeader from "../../components/app-header/app-header";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";

import appStyles from "./app.module.css";

const serverUrl = "https://norma.nomoreparties.space/api/ingredients";

function App() {
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    error: "",
    data: [],
  });

  const getData = async () => {
    setState({ ...state, hasError: false, isLoading: true });
    fetch(serverUrl)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setState({ ...state, data: data.data, isLoading: false });
        } else {
          setState({ ...state, isLoading: false, hasError: true });
        }
      })
      .catch((e) => {
        setState({ ...state, hasError: true, error: e, isLoading: false });
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <AppHeader />
      {state.isLoading ? (
        <div className={appStyles["loading"]}>
          <p className="text text_type_main-large">Данные загружаются</p>
        </div>
      ) : state.hasError ? (
        <div className={appStyles["loading"]}>
          <p className="text text_type_main-large">
            Данные не смогли загрузиться: {state.error}
          </p>
        </div>
      ) : state.data.length !== 0 ? (
        <section className={appStyles["row"]}>
          <div className={`mr-10`}>
            <BurgerIngredients ingredients={state.data} />
          </div>
          <div>
            <BurgerConstructor ingredients={state.data} />
          </div>
        </section>
      ) : null}
    </div>
  );
}

export default App;
