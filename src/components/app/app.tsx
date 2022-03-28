import { useState, useEffect, useReducer, Reducer } from "react";
import { Route, Routes } from "react-router-dom";

import AppHeader from "../../components/app-header/app-header";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import { BurgerConstructorContext } from "../../components/services/appContext";
import { burgerConstructorReducer } from "../../components/reducers/reducers";

import appStyles from "./app.module.css";

const serverUrl = "https://norma.nomoreparties.space/api/ingredients";

interface IngredientType {
  _id: string;
  image: string;
  text: string;
  price: number;
}
interface InitialStateType {
  ingredients: IngredientType[];
  bun: IngredientType;
  totalPrice: number;
}

const initialState: InitialStateType = {
  ingredients: [],
  bun: {} as IngredientType,
  totalPrice: 0,
};

function App() {
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    error: "",
    data: [],
  });

  const [burgerConstructorState, burgerConstructorDispatcher] = useReducer(
    burgerConstructorReducer,
    initialState,
    undefined
  );

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
      <Routes>
        <Route
          path="/"
          element={
            <>
              {state.isLoading ? (
                <div className={appStyles["loading"]}>
                  <p className="text text_type_main-large">
                    Данные загружаются
                  </p>
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
                    <BurgerConstructorContext.Provider
                      value={{
                        burgerConstructorState,
                        burgerConstructorDispatcher,
                      }}
                    >
                      <BurgerConstructor />
                    </BurgerConstructorContext.Provider>
                  </div>
                </section>
              ) : null}
            </>
          }
        />
        <Route path="/orders" element={<></>} />
        <Route path="/account" element={<></>} />
      </Routes>
    </div>
  );
}

export default App;
