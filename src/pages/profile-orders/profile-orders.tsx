import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

import { Order } from "../../components/order/order";
import { useAppSelector, useAppDispatch } from "../../services/hooks";
import { wsInit, wsClose } from "../../services/reducers/orders-web-socket";
import { getNewAccessToken } from "../../services/reducers/auth/auth";
import { getCookie } from "../../utils/utils";

import styles from "./profile-orders.module.css";

const setActive = (
  { isActive }: { isActive: boolean },
  additionalClass: String
) =>
  "text text_type_main-default " +
  (isActive ? "" : "text_color_inactive ") +
  additionalClass;

export function ProfileOrders() {
  const ordersData = useAppSelector((state) => state.feedPage.ordersData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const accessToken = getCookie("accessToken");
    if (accessToken === undefined) {
      dispatch(getNewAccessToken());
    } else {
      dispatch(wsInit({ token: accessToken.split(" ")[1] }));
    }
    return () => {
      dispatch(wsClose());
    };
  }, [dispatch]);

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
        <div className={`${styles["orders-container"]} mt-10`}>
          {ordersData &&
            ordersData.orders
              .slice(0)
              .reverse()
              .map((order) => {
                return (
                  <Order
                    number={order.number}
                    date={new Date(order.createdAt)}
                    title={order.name}
                    status={order.status}
                    orderIngredients={order.ingredients}
                    key={order._id}
                  />
                );
              })}
        </div>
      </div>
    </motion.div>
  );
}
