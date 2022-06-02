import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

import { useAppSelector } from "../../services/hooks";
import { Order } from "../../components/order/order";
import { LoadingScreen } from "../../components/loading-screen/loading-screen";
import { ErrorScreen } from "../../components/error-screen/error-screen";

import styles from "./profile-orders.module.css";
import { useGetOrdersQuery } from "../../services/rtk/web-socket";

const setActive = (
  { isActive }: { isActive: boolean },
  additionalClass: String
) =>
  "text text_type_main-default " +
  (isActive ? "" : "text_color_inactive ") +
  additionalClass;

export function ProfileOrders() {
  let content = null;

  const { tokens } = useAppSelector((state) => state.authUser);

  const { data, isLoading, error } = useGetOrdersQuery(
    `wss://norma.nomoreparties.space/orders?token=${
      tokens.accessToken?.split(" ")[1]
    }`
  );

  if ((data && data.success === false) || isLoading) {
    content = (
      <LoadingScreen text="Загружается история заказов" size="medium" />
    );
  }

  if (error) {
    content = (
      <ErrorScreen
        text={`Произошла ошибка при загрузке истории заказов: ${error}`}
      />
    );
  }

  if (data && data.orders.length > 1) {
    content = (
      <>
        {data &&
          data.orders
            .slice(0)
            .reverse()
            .map((order) => {
              return (
                <Order
                  createdAt={order.createdAt}
                  ingredients={order.ingredients}
                  name={order.name}
                  number={order.number}
                  status={order.status}
                  updatedAt={order.updatedAt}
                  _id={order._id}
                  key={order._id}
                />
              );
            })}
      </>
    );
  }

  return (
    <motion.div
      key="profile-page"
      initial={{ x: "+200%" }}
      animate={{ x: "0" }}
      transition={{
        type: "ease",
      }}
    >
      <div className={styles["profile-container"]}>
        <div className={`${styles["profile-items-container"]} mt-30 mr-15`}>
          <NavLink
            to="/profile"
            className={(isActive) => setActive(isActive, "mb-6")}
            end
          >
            Профиль
          </NavLink>
          <NavLink
            to="/profile/orders"
            className={(isActive) => setActive(isActive, "mb-6")}
          >
            История заказов
          </NavLink>
          <NavLink
            to="/logout"
            className={(isActive) => setActive(isActive, "mb-20")}
          >
            Выход
          </NavLink>
          <p className="text text_type_main-default text_color_inactive">
            В этом разделе вы можете просмотреть свою историю заказов
          </p>
        </div>
        <div className={`${styles["orders-container"]} mt-10`}>{content}</div>
      </div>
    </motion.div>
  );
}
