import { motion, AnimatePresence } from "framer-motion";

import modalOverlayStyles from "./modal-overlay.module.css";

interface ModalOverlayProps {
  children: JSX.Element;
  onClose: () => void;
  title: string;
}

function ModalOverlay({ onClose, children }: ModalOverlayProps) {
  return (
    <AnimatePresence>
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
    </AnimatePresence>
  );
}

export default ModalOverlay;
