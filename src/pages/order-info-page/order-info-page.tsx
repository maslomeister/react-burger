import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../services/hooks";
import { OrderInfo } from "../../components/orders-info/order-info";
import { getOrderByNumber } from "../../services/reducers/order-details";
import { LoadingScreen } from "../../components/loading-screen/loading-screen";

import styles from "./order-info-page.module.css";

export function OrderInfoPage() {
  let content = (
    <LoadingScreen text="Загружаются данные заказа" size="medium" />
  );
  const dispatch = useAppDispatch();

  const params = useParams();

  const { orderData } = useAppSelector((state) => state.orderDetails);

  useEffect(() => {
    if (orderData === undefined && params && params.id) {
      dispatch(getOrderByNumber(Number(params.id)));
    }
  }, [dispatch, orderData, params]);

  if (orderData) {
    content = <OrderInfo orderData={orderData} isModal />;
  }

  return <div className={`${styles["container"]} mt-30`}>{content}</div>;
}
