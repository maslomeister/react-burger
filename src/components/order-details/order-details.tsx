import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import checkIconBackground from "../../images/order-details/check_icon_background.svg";
import Modal from "../../components/modal/modal";

import orderDetailsStyles from "./order-details.module.css";

interface OrderDetailsProps {
  show: boolean;
  onClose: () => void;
}

function OrderDetails(props: OrderDetailsProps) {
  return (
    <Modal onClose={props.onClose} show={props.show} closeIconType={"primary"}>
      <div className={orderDetailsStyles.Main}>
        <div
          className={`${orderDetailsStyles.Main_orderNumberShadow} text text_type_digits-large mt-30`}
        >
          034536
        </div>
        <div className="text text_type_digits-small mt-8">
          идентификатор заказа
        </div>
        <div
          className={`${orderDetailsStyles.Main_background} mb-15 mt-15`}
          style={{ background: `url(${checkIconBackground})` }}
        >
          <div className={orderDetailsStyles.Main_checkMarkIconBackground}>
            <CheckMarkIcon type="primary" />
          </div>
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
