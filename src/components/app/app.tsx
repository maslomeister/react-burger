import appStyles from "./app.module.css";
import { useState, useEffect } from "react";
import AppHeader from "../../components/app-header/app-header";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import Tabs from "../../utils/tabs-data";

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
      {state.hasError && (
        <div className={appStyles.loading}>
          <p className="text text_type_main-large">Данные загружаются</p>
        </div>
      )}
      {state.isLoading && (
        <div className={appStyles.loading}>
          <p className="text text_type_main-large">
            Данные не смогли загрузиться: {state.error}
          </p>
        </div>
      )}
      {!state.isLoading && !state.hasError && state.data.length !== 0 && (
        <section className={appStyles.row}>
          <div className={`{buildStyles.col_left} mr-10`}>
            <BurgerIngredients tabs={Tabs} dataArray={state.data} />
          </div>
          <div className={appStyles.col_right}>
            <BurgerConstructor
              dataArray={state.data}
              topBun={state.data[0]}
              bottomBun={state.data[state.data.length - 1]}
            />
          </div>
        </section>
      )}
    </div>
  );
}

export default App;
