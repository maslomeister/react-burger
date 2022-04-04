import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import AnimatedLoading from "../../components/animated-loading/animated-loading";
import Modal from "../../components/modal/modal";

import orderDetailsStyles from "./order-details.module.css";

interface OrderDetailsProps {
  status: string;
  error: string;
  orderId: number;
  onClose: () => void;
}

function OrderDetails({ onClose, status, error, orderId }: OrderDetailsProps) {
  let content;
  if (status === "loading") {
    content = (
      <div className={orderDetailsStyles["order-details"]}>
        <div
          className={`${orderDetailsStyles["order-number_shadow"]} text text_type_main-large mt-30`}
        >
          Загрузка
        </div>
        <div
          className={`${orderDetailsStyles["check-mark-icon_background-size"]} mb-15 mt-15`}
        >
          <AnimatedLoading />
        </div>
      </div>
    );
  } else if (status === "succeeded") {
    content = (
      <div className={orderDetailsStyles["order-details"]}>
        <div
          className={`${orderDetailsStyles["order-number_shadow"]} text text_type_digits-large mt-30`}
        >
          {orderId}
        </div>

        <div className="text text text_type_main-default mt-8">
          идентификатор заказа
        </div>

        <div
          className={`${orderDetailsStyles["check-mark-icon_background-size"]} mb-15 mt-15`}
        >
          <div className={orderDetailsStyles["check-mark-icon_size"]}>
            <CheckMarkIcon type="primary" />
          </div>
          <AnimatedLoading />
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
      <div className={orderDetailsStyles["order-details"]}>
        <div
          className={`${orderDetailsStyles["order-number_shadow"]} text text_type_main-large mt-30`}
        >
          Произошла ошибка
        </div>
        <div
          className={`${orderDetailsStyles["order-number_shadow"]} text text_type_main-medium mb-15 mt-15`}
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

export default OrderDetails;
