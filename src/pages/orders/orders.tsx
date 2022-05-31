import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import { useAppSelector, useAppDispatch } from "../../services/hooks";
import { wsInit, wsClose } from "../../services/reducers/orders-web-socket";
import { Order } from "../../components/order/order";
import { LoadingScreen } from "../../components/loading-screen/loading-screen";

import styles from "./orders.module.css";

interface IOrdersFeed {
  orders: IOrder[];
}

function OrdersFeed({ orders }: IOrdersFeed) {
  return (
    <div className={styles["orders_feed"]}>
      {orders.map((order) => (
        <Order
          createdAt={order.createdAt}
          ingredients={order.ingredients}
          name={order.name}
          number={order.number}
          status={order.status}
          updatedAt={order.updatedAt}
          _id={order._id}
        />
      ))}
    </div>
  );
}

interface IStats {
  orders: IOrder[];
  ordersAll: number;
  ordersToday: number;
}

function Stats({ orders, ordersAll, ordersToday }: IStats) {
  return (
    <div className={`${styles["stats"]} pl-15`}>
      <div className={`${styles["stats_orders_container"]} mb-15`}>
        <div className={styles["stats_orders_container_child"]}>
          <p className="text text_type_main-medium mb-6">Готовы:</p>
          <div className={`${styles["orders_ready"]} pb-2`}>
            {orders.map((order) => {
              if (order.status === "done") {
                return (
                  <p
                    className="text text_type_digits-default"
                    key={order.number}
                  >
                    {order.number}
                  </p>
                );
              }
              return null;
            })}
          </div>
        </div>
        <div className={styles["stats_orders_container_child"]}>
          <p className="text text_type_main-medium mb-6">В работе:</p>
          <div className={`${styles["orders_in_progress"]} pb-2`}>
            {orders.map((order) => {
              if (order.status === "pending") {
                return (
                  <p
                    className="text text_type_digits-default"
                    key={order.number}
                  >
                    {order.number}
                  </p>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>

      <p className="text text_type_main-medium">Выполнено за все время:</p>
      <h1
        className={`${styles["text_shadow"]} text text_type_digits-large mb-15`}
      >
        {ordersAll}
      </h1>

      <p className="text text_type_main-medium">Выполнено за сегодня:</p>
      <h1 className={`${styles["text_shadow"]} text text_type_digits-large`}>
        {ordersToday}
      </h1>
    </div>
  );
}

export function Orders() {
  const ordersData = useAppSelector((state) => state.feedPage.ordersData);
  const dispatch = useAppDispatch();
  const location = useLocation() as TLocationProps;

  const previousPath = location.state && location.state.from;

  const motionInitialX = previousPath
    ? previousPath.pathname === "/"
      ? "+200%"
      : "-200%"
    : 0;

  useEffect(() => {
    dispatch(wsInit({}));
    return () => {
      dispatch(wsClose());
    };
  }, [dispatch]);

  return (
    <motion.div
      key="feed"
      initial={{ x: motionInitialX }}
      animate={{ x: "0" }}
      transition={{
        type: "ease",
      }}
      className={styles["container"]}
    >
      {ordersData ? (
        <>
          <div className={styles["text_row"]}>
            <h1 className="text text_type_main-large mt-10 mb-6">
              Лента заказов
            </h1>
          </div>

          <div className={styles["row"]}>
            <OrdersFeed orders={ordersData.orders} />
            <Stats
              orders={ordersData.orders}
              ordersAll={ordersData.total}
              ordersToday={ordersData.totalToday}
            />
          </div>
        </>
      ) : (
        <LoadingScreen text="Загружается история заказов" size="medium" />
      )}
    </motion.div>
  );
}
