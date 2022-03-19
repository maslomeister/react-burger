import { createPortal } from "react-dom";

import modalOverlayStyles from "./modal-overlay.module.css";

interface ModalOverlayProps {
  children: JSX.Element;
  onClose: () => void;
  show: boolean;
  title: string;
}

function ModalOverlay(props: ModalOverlayProps) {
  const modalRoot: Element = document.getElementById("modal-root") as Element;
  if (!props.show) {
    return null;
  }

  return createPortal(
    <div className={modalOverlayStyles.Main} onClick={props.onClose}>
      {props.children}
    </div>,
    modalRoot
  );
}

export default ModalOverlay;
