import { createPortal } from "react-dom";

import modalOverlayStyles from "./modal-overlay.module.css";

interface modalOverlayProps {
  children: JSX.Element;
  onClose: any;
  show: boolean;
}

function ModalOverlay(props: modalOverlayProps) {
  if (!props.show) {
    return null;
  }

  return createPortal(
    <div className={modalOverlayStyles.main} onClick={props.onClose}>
      <div
        className={modalOverlayStyles.inner}
        onClick={(e) => e.stopPropagation()}
      >
        {props.children}
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
}

export default ModalOverlay;
