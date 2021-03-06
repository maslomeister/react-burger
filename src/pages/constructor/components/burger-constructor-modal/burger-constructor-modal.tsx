import React from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

import styles from "./burger-constructor-modal.module.css";

type Props = {
  children: any;
  onAnimationFinish: (e: any) => void;
};

export function BurgerConstructorModal({ children, onAnimationFinish }: Props) {
  const modalRoot: Element = document.getElementById("modal-root") as Element;

  return createPortal(
    <motion.div
      key="mobile-cart-popup"
      onAnimationComplete={onAnimationFinish}
      initial={{ y: "+100%" }}
      animate={{ y: "0", transition: { duration: 0.25 } }}
      exit={{ y: "+100%", transition: { duration: 0.15 } }}
      transition={{ type: "ease-in-out" }}
      className={styles["mobile-cart"]}
    >
      {children}
    </motion.div>,
    modalRoot
  );
}
