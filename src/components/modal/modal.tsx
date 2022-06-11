import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

import { ModalOverlay } from "../../components/modal-overlay/modal-overlay";
import { CloseIconAdaptive } from "../../assets/icons/close-icon";

import styles from "./modal.module.css";

declare type TIconTypes = "secondary" | "primary" | "error" | "success";

interface ModalProps {
  children: React.ReactNode;
  title?: string;
  titleIsNumber?: boolean;
  closeIconType: TIconTypes;
  onClose: () => void;
}

export function Modal({
  onClose,
  children,
  title = "",
  closeIconType,
  titleIsNumber,
}: ModalProps) {
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
        exit={{ scale: 0, opacity: 0, transition: { duration: 0.2 } }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        {title ? (
          <div className={styles["modal-header"]}>
            <p
              className={`${styles["modal-title"]}
                ${
                  titleIsNumber
                    ? "text text_type_digits-default"
                    : "text text_type_main-medium"
                }
              `}
            >
              {title}
            </p>
            <div
              className={styles["close-icon_flex"]}
              onClick={onClose}
              data-test-id="modal-close-icon"
            >
              <CloseIconAdaptive width={48} height={48} type={closeIconType} />
            </div>
          </div>
        ) : (
          <div
            className={styles["close-icon_absolute"]}
            onClick={onClose}
            data-test-id="modal-close-icon"
          >
            <CloseIconAdaptive width={48} height={48} type={closeIconType} />
          </div>
        )}
        {children}
      </motion.div>
    </ModalOverlay>,
    modalRoot
  );
}
