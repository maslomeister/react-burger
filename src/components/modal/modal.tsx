import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../../components/modal-overlay/modal-overlay";

import styles from "./modal.module.css";

declare type TIconTypes = "secondary" | "primary" | "error" | "success";

interface ModalProps {
  children: React.ReactNode;
  title: string;
  closeIconType: TIconTypes;
  onClose: () => void;
}

const defaultProps = {
  title: "",
};

Modal.defaultProps = defaultProps;

export function Modal({ onClose, children, title, closeIconType }: ModalProps) {
  const modalRoot: Element = document.getElementById("modal-root") as Element;

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
  }, [onClose]);

  return createPortal(
    <ModalOverlay onClose={onClose} title={title}>
      <motion.div
        key="modal"
        className={styles["modal"]}
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
          <div className={`${styles["modal_title"]} ml-10 mr-10 mt-10`}>
            <p className="text text_type_main-medium">{title}</p>
            <div className={styles["close-icon_flex"]} onClick={onClose}>
              <CloseIcon type={closeIconType} />
            </div>
          </div>
        ) : (
          <div
            className={`${styles["close-icon_absolute"]} mr-10 mt-15`}
            onClick={onClose}
          >
            <CloseIcon type={closeIconType} />
          </div>
        )}
        {children}
      </motion.div>
    </ModalOverlay>,
    modalRoot
  );
}
