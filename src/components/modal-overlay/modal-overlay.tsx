import { motion } from "framer-motion";

import styles from "./modal-overlay.module.css";

interface ModalOverlayProps {
  children: JSX.Element;
  onClose: () => void;
  title: string;
}

function ModalOverlay({ onClose, children }: ModalOverlayProps) {
  return (
    <motion.div
      key="modal-overlay"
      className={styles["modal-overlay"]}
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        type: "ease",
      }}
    >
      {children}
    </motion.div>
  );
}

export default ModalOverlay;
