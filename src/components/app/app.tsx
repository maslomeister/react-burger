import { useState, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import { Route, Routes } from "react-router-dom";

import AppHeader from "../../components/app-header/app-header";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import {
  initialState,
  BurgerConstructorContext,
} from "../../components/services/appContext";
import { burgerConstructorReducer } from "../../components/reducers/reducers";
import { getIngredients, Item } from "../../utils/burger-api";

import appStyles from "./app.module.css";

const item = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired,
});

const propTypes = {
  ingredients: PropTypes.arrayOf(item.isRequired),
  item,
  isLoading: PropTypes.bool,
  hasError: PropTypes.bool,
  error: PropTypes.string,
};

App.propTypes = propTypes;

type AppTypes = PropTypes.InferProps<typeof propTypes>;

function App() {
  const [state, setState] = useState<AppTypes>({
    isLoading: true,
    hasError: false,
    error: "",
    ingredients: [],
  });

  const [burgerConstructorState, burgerConstructorDispatcher] = useReducer(
    burgerConstructorReducer,
    initialState,
    undefined
  );

  

  useEffect(() => {
    getIngredients()
      .then((ingredients) => {
        setState({...state, hasError: false, isLoading: false, error: "", ingredients: ingredients });
      })
      .catch((err) => {
        setState((state) =>({ ...state, hasError: true, error: err }));
      })
      .finally(() => setState((state) =>({ ...state, isLoading: false })));
  }, []);


  // Пока не прикрутил dnd использую это
  useEffect(() => {
    if (state.ingredients && state.ingredients.length !== 0) {
      burgerConstructorDispatcher({
        type: "ADD_BUN",
        payload: {
          _id: state.ingredients[0]._id,
          image: state.ingredients[0].image,
          text: state.ingredients[0].name,
          price: state.ingredients[0].price,
        },
      });
      state.ingredients.map((item) => {
        if (item?.type !== "bun") {
          return burgerConstructorDispatcher({
            type: "ADD_INGREDIENT",
            payload: {
              _id: item._id,
              image: item.image,
              text: item.name,
              price: item.price,
            },
          });
        }
        return null;
      });
    }
  }, [state.ingredients]);

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
              ) : state.ingredients && state.ingredients.length !== 0 ? (
                <section className={appStyles["row"]}>
                  <div className={`mr-10`}>
                    <BurgerIngredients ingredients={state.ingredients} />
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
