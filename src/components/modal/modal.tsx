import { useEffect } from "react";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../../components/modal-overlay/modal-overlay";

import modalStyles from "./modal.module.css";

declare type TIconTypes = "secondary" | "primary" | "error" | "success";

interface ModalProps {
  children: any;
  title: string;
  onClose: () => void;
  show: boolean;
  closeIconType: TIconTypes;
}

const defaultProps = {
  title: "",
};

Modal.defaultProps = defaultProps;

function Modal(props: ModalProps) {
  useEffect(() => {
    const closeOnESC = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        props.onClose();
      }
    };

    if (props.show) {
      document.body.addEventListener("keydown", closeOnESC);
    }

    return () => {
      if (!props.show) {
        document.body.removeEventListener("keydown", closeOnESC);
      }
    };
  }, [props.show]);

  return (
    <ModalOverlay onClose={props.onClose} show={props.show} title={props.title}>
      <div
        className={modalStyles["modal"]}
        onClick={(e) => e.stopPropagation()}
      >
        {props.title ? (
          <div className={`${modalStyles["modal_title"]} ml-10 mr-10 mt-10`}>
            <p className="text text_type_main-medium">{props.title}</p>
            <div
              className={modalStyles["close-icon_flex"]}
              onClick={props.onClose}
            >
              <CloseIcon type={props.closeIconType} />
            </div>
          </div>
        ) : (
          <div
            className={`${modalStyles["close-icon_absolute"]} mr-10 mt-15`}
            onClick={props.onClose}
          >
            <CloseIcon type={props.closeIconType} />
          </div>
        )}
        {props.children}
      </div>
    </ModalOverlay>
  );
}

export default Modal;
