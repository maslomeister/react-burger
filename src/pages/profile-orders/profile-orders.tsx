import { useRef, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

import { useAppSelector } from "../../services/hooks";
import { LoadingScreen } from "../../components/loading-screen/loading-screen";
import { ErrorScreen } from "../../components/error-screen/error-screen";
import { useGetOrdersQuery } from "../../services/rtk/web-socket";
import { OrdersInfinityScroll } from "../../components/orders-inifinity-scroll/orders-infinity-scroll";

import styles from "./profile-orders.module.css";

const setActive = (
  { isActive }: { isActive: boolean },
  additionalClass: String
) =>
  "text text_type_main-default " +
  (isActive ? "" : "text_color_inactive ") +
  additionalClass;

export function ProfileOrders() {
  const isMobile = useMediaQuery({ query: "(max-width: 1023px)" });

  const ordersRef = useRef<HTMLDivElement>(null);
  const [ordersHeight, setOrdersHeight] = useState(0);

  useEffect(() => {
    setOrdersHeight(ordersRef?.current?.clientHeight ?? 0);
  }, []);

  let content = null;

  const { tokens } = useAppSelector((state) => state.authUser);

  const { data, isLoading, error } = useGetOrdersQuery(
    `wss://norma.nomoreparties.space/orders?token=${
      tokens.accessToken?.split(" ")[1]
    }`
  );

  if ((data && data.success === false) || isLoading || ordersHeight === 0) {
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

  if (data && data.orders.length >= 1 && ordersHeight > 0) {
    content = (
      <OrdersInfinityScroll
        orders={data.orders.slice(0).reverse()}
        height={ordersHeight}
      />
    );
  }

  return (
    <motion.div
      key="profile-page"
      initial={{ x: "+100%" }}
      animate={{ x: "0" }}
      transition={{
        type: "ease",
      }}
      className={styles["container"]}
    >
      <div className={styles["profile-container"]}>
        {isMobile && (
          <h1 className="text text_type_main-large mt-4 mb-8">
            История заказов
          </h1>
        )}
        {!isMobile && (
          <div className={`${styles["profile-items-container"]} mt-30 mr-15`}>
            <NavLink
              to={"/profile"}
              className={(isActive) => setActive(isActive, "mb-6")}
              end
            >
              Профиль
            </NavLink>
            <NavLink
              to={"/profile/orders"}
              className={(isActive) => setActive(isActive, "mb-6")}
            >
              История заказов
            </NavLink>
            <NavLink
              to={"/logout"}
              className={(isActive) => setActive(isActive, "mb-20")}
            >
              Выход
            </NavLink>
            <p className="text text_type_main-default text_color_inactive">
              В этом разделе вы можете просмотреть свою историю заказов
            </p>
          </div>
        )}
        <div className={styles["orders-container"]} ref={ordersRef}>
          {content}
        </div>
      </div>
    </motion.div>
  );
}
