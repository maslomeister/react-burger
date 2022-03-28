import { motion } from "framer-motion";

import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import AnimatedLoading from "../../components/animated-loading/animated-loading";
import checkIconBackground from "../../assets/images/order-details/check_icon_background.svg";
import Modal from "../../components/modal/modal";

import orderDetailsStyles from "./order-details.module.css";

interface OrderDetailsProps {
  show: boolean;
  onClose: () => void;
}

function OrderDetails({ onClose, show }: OrderDetailsProps) {
  return (
    <Modal onClose={onClose} show={show} closeIconType="primary">
      <div className={orderDetailsStyles["order-details"]}>
        <div
          className={`${orderDetailsStyles["order-number_shadow"]} text text_type_digits-large mt-30`}
        >
          034536
        </div>

        <div className="text text_type_digits-small mt-8">
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

        <p className="text text_type_digits-small mb-2">
          Ваш заказ начали готовить
        </p>

        <p className="text text_type_digits-small text_color_inactive mb-30">
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    </Modal>
  );
}

export default OrderDetails;
