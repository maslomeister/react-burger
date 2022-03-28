import React, { useEffect } from "react";
import { motion } from "framer-motion";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../../components/modal-overlay/modal-overlay";

import modalStyles from "./modal.module.css";

declare type TIconTypes = "secondary" | "primary" | "error" | "success";

interface ModalProps {
  children: React.ReactNode;
  title: string;
  show: boolean;
  closeIconType: TIconTypes;
  onClose: () => void;
}

const defaultProps = {
  title: "",
};

Modal.defaultProps = defaultProps;

function Modal({ onClose, children, title, show, closeIconType }: ModalProps) {
  useEffect(() => {
    const closeOnESC = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.body.addEventListener("keydown", closeOnESC);

    return () => {
      document.body.removeEventListener("keydown", closeOnESC);
    };
  }, [show]);

  return (
    <ModalOverlay onClose={onClose} show={show} title={title}>
      <motion.div
        className={modalStyles["modal"]}
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        {title ? (
          <div className={`${modalStyles["modal_title"]} ml-10 mr-10 mt-10`}>
            <p className="text text_type_main-medium">{title}</p>
            <div className={modalStyles["close-icon_flex"]} onClick={onClose}>
              <CloseIcon type={closeIconType} />
            </div>
          </div>
        ) : (
          <div
            className={`${modalStyles["close-icon_absolute"]} mr-10 mt-15`}
            onClick={onClose}
          >
            <CloseIcon type={closeIconType} />
          </div>
        )}
        {children}
      </motion.div>
    </ModalOverlay>
  );
}

export default Modal;
