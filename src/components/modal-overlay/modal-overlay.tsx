import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

import modalOverlayStyles from "./modal-overlay.module.css";

interface ModalOverlayProps {
  children: JSX.Element;
  onClose: () => void;
  show: boolean;
  title: string;
}

function ModalOverlay({ onClose, children, show }: ModalOverlayProps) {
  const modalRoot: Element = document.getElementById("modal-root") as Element;

  return createPortal(
    <AnimatePresence exitBeforeEnter>
      {show && (
        <motion.div
          className={modalOverlayStyles["modal-overlay"]}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            type: "ease",
          }}
          key="modal-overlay"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    modalRoot
  );
}

export default ModalOverlay;
