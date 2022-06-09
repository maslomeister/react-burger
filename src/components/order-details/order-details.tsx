import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { AnimatedLoading } from "../../components/animated-loading/animated-loading";
import { Modal } from "../../components/modal/modal";
import { useMediaQuery } from "react-responsive";

import styles from "./order-details.module.css";

interface OrderDetailsProps {
  status: string;
  error: string;
  orderId: number;
  onClose: () => void;
}

export function OrderDetails({
  onClose,
  status,
  error,
  orderId,
}: OrderDetailsProps) {
  const isMobileOrTablet = useMediaQuery({ query: "(max-width: 1023px)" });

  let content;
  if (status === "getOrderNumber/loading") {
    content = (
      <div className={styles["order-details"]}>
        <div
          className={`${styles["order-number_shadow"]} text text_type_main-large`}
        >
          Загрузка
        </div>
        <div
          className={`${styles["check-mark-icon_background-size"]} mb-15 mt-15`}
        >
          <div className={styles["loading-icon_absolute"]}>
            <AnimatedLoading />
          </div>
        </div>
      </div>
    );
  } else if (status === "getOrderNumber/succeeded") {
    content = (
      <div className={styles["order-details"]}>
        {isMobileOrTablet && (
          <h1 className={`${styles["order-title"]} text text_type_main_medium`}>
            Заказ оформлен
          </h1>
        )}
        <div
          className={`${
            styles["order-number_shadow"]
          } text text_type_digits-large ${
            isMobileOrTablet ? "mt-15" : "mt-30"
          }`}
        >
          {orderId}
        </div>

        <div
          className={`text text_type_main-${
            isMobileOrTablet ? "medium" : "default"
          } mt-8`}
        >
          идентификатор заказа
        </div>

        <div
          className={`${styles["check-mark-icon_background-size"]} mb-15 mt-15`}
        >
          <div className={styles["check-mark-icon_size"]}>
            <CheckMarkIcon type="primary" />
          </div>
          <div className={styles["loading-icon_absolute"]}>
            <AnimatedLoading />
          </div>
        </div>

        <p className="text text text_type_main-default mb-2">
          Ваш заказ начали готовить
        </p>

        <p className="text text text_type_main-default text_color_inactive mb-30">
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    );
  } else if (status === "failed") {
    content = (
      <div className={styles["order-details"]}>
        <div
          className={`${styles["order-number_shadow"]} text text_type_main-large mt-30`}
        >
          Произошла ошибка
        </div>
        <div
          className={`${styles["order-number_shadow"]} text text_type_main-medium mb-15 mt-15`}
        >
          {error}
        </div>
      </div>
    );
  }
  return (
    <Modal onClose={onClose} closeIconType="primary">
      {content}
    </Modal>
  );
}
