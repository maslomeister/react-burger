import React from "react";
import orderDetailsStyles from "./order-details.module.css";
import ModalOverlay from "../../components/modal-overlay/modal-overlay";
import Modal from "../../components/modal/modal";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

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
          <div className="text text_type_digits-large mt-30">034536</div>
        </div>
      </Modal>
    </ModalOverlay>
  );
}

export default OrderDetails;
