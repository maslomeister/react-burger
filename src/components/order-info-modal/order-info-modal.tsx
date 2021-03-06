import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../services/hooks";
import { OrderInfo } from "../order-info/order-info";
import { getOrderByNumber } from "../../services/reducers/order-details/order-details";
import { LoadingScreen } from "../../components/loading-screen/loading-screen";

import styles from "./order-info-modal.module.css";

export function OrderInfoModal() {
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

  return (
    <div className={`${styles["container"]} ml-10 mr-10 mb-10`}>{content}</div>
  );
}
