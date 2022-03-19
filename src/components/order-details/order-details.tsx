import {
  CloseIcon,
  CheckMarkIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import checkIconBackground from "../../images/order-details/check_icon_background.svg";
import ModalOverlay from "../../components/modal-overlay/modal-overlay";
import Modal from "../../components/modal/modal";

import orderDetailsStyles from "./order-details.module.css";

interface orderDetailsProps {
  show: boolean;
  onClose: Function;
}

function OrderDetails(props: orderDetailsProps) {
  return (
    <ModalOverlay onClose={props.onClose} show={props.show}>
      <Modal
        onClose={props.onClose}
        title=""
        closeIcon={<CloseIcon type="primary" />}
      >
        <div className={orderDetailsStyles.main}>
          <div
            className={`${orderDetailsStyles.order_number} text text_type_digits-large mt-30`}
          >
            034536
          </div>
          <div className="text text_type_digits-small mt-8">
            идентификатор заказа
          </div>
          <div
            className={`${orderDetailsStyles.background} mb-15 mt-15`}
            style={{ background: `url(${checkIconBackground})` }}
          >
            <div className={orderDetailsStyles.check_icon_background}>
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
    </ModalOverlay>
  );
}

export default OrderDetails;
