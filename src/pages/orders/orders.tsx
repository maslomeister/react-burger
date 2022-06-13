import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "react-responsive";

import { Order } from "../../components/order/order";
import { LoadingScreen } from "../../components/loading-screen/loading-screen";
import { ErrorScreen } from "../../components/error-screen/error-screen";
import { useGetOrdersQuery } from "../../services/rtk/web-socket";
import { returnOrdersWithStatus } from "../../utils/utils";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./orders.module.css";

interface IOrdersFeed {
  orders: IOrder[];
}

function OrdersFeed({ orders }: IOrdersFeed) {
  return (
    <motion.div
      key="mobile-stats"
      initial={{ x: "-100%" }}
      animate={{ x: "0", transition: { duration: 0.25 } }}
      exit={{ x: "-100%", transition: { duration: 0.15 } }}
      transition={{ type: "ease-in-out" }}
      className={styles["orders_feed"]}
    >
      {orders.map((order) => (
        <Order order={order} key={order._id} />
      ))}
    </motion.div>
  );
}

interface IStats {
  orders: IOrder[];
  ordersAll: number;
  ordersToday: number;
}

function Stats({ orders, ordersAll, ordersToday }: IStats) {
  const doneOrders = useMemo(
    () => returnOrdersWithStatus("done", orders),
    [orders]
  );
  const createdOrders = useMemo(
    () => returnOrdersWithStatus("pending", orders),
    [orders]
  );

  return (
    <motion.div
      key="mobile-stats"
      initial={{ x: "+100%" }}
      animate={{ x: "0", transition: { duration: 0.25 } }}
      exit={{ x: "+100%", transition: { duration: 0.15 } }}
      transition={{ type: "ease-in-out" }}
      className={styles["stats"]}
    >
      <div className={`${styles["stats_orders_container"]} mb-15`}>
        <div className={styles["stats_orders_container_child"]}>
          <p className="text text_type_main-medium mb-6">Готовы:</p>
          <div className={`${styles["orders_ready"]} pb-2`}>
            {doneOrders.map((order) => (
              <p className="text text_type_digits-default" key={order.number}>
                {order.number}
              </p>
            ))}
          </div>
        </div>
        <div className={styles["stats_orders_container_child"]}>
          <p className="text text_type_main-medium mb-6">В работе:</p>
          <div className={`${styles["orders_in_progress"]} pb-2`}>
            {createdOrders.map((order) => (
              <p className="text text_type_digits-default" key={order.number}>
                {order.number}
              </p>
            ))}
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
    </motion.div>
  );
}

export function Orders() {
  const isMobile = useMediaQuery({ query: "(max-width: 1023px)" });

  const [activeTab, setActiveTab] = useState("orders");

  let content = null;
  const { data, isLoading, error } = useGetOrdersQuery(
    "wss://norma.nomoreparties.space/orders/all"
  );
  const location = useLocation() as TLocationProps;

  const previousPath = location.state && location.state.from;

  const motionInitialX = previousPath
    ? previousPath === "/"
      ? "+200%"
      : "-200%"
    : 0;

  const onTabClick = (value: string) => {
    setActiveTab(value);
  };

  if ((data && data.success === false) || isLoading) {
    content = (
      <LoadingScreen text="Загружается история заказов" size="medium" />
    );
  }

  if (error) {
    content = (
      <ErrorScreen text="Произошла ошибка при загрузке истории заказов" />
    );
  }

  if (data && data.orders.length > 1) {
    content = (
      <>
        <div className={styles["text-row"]}>
          <h1 className="text text_type_main-large">Лента заказов</h1>
        </div>

        {isMobile && (
          <div className={styles["tabs"]}>
            <div className={styles["tab-wrapper"]}>
              <Tab
                value={"orders"}
                active={activeTab === "orders"}
                onClick={onTabClick}
              >
                Заказы
              </Tab>
            </div>
            <div className={styles["tab-wrapper"]}>
              <Tab
                value={"stats"}
                active={activeTab === "stats"}
                onClick={onTabClick}
              >
                Статистика
              </Tab>
            </div>
          </div>
        )}

        <div className={styles["row"]}>
          <AnimatePresence>
            {((isMobile && activeTab === "orders") || !isMobile) && (
              <OrdersFeed orders={data.orders} />
            )}
            {((isMobile && activeTab === "stats") || !isMobile) && (
              <Stats
                orders={data.orders}
                ordersAll={data.total}
                ordersToday={data.totalToday}
              />
            )}
          </AnimatePresence>
        </div>
      </>
    );
  }

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
      {content}
    </motion.div>
  );
}
