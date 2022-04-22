import Modal from "../../components/modal/modal";

import styles from "./error-modal.module.css";

interface ErrorModalProps {
  error: string;
  onClose: () => void;
}

function ErrorModal({ onClose, error }: ErrorModalProps) {
  return (
    <Modal onClose={onClose} closeIconType="primary">
      <div className={styles["error"]}>
        <div
          className={`${styles["error-text_shadow"]} text text_type_main-large mt-30`}
        >
          Произошла ошибка
        </div>

        <p className="text text_type_main-medium mb-30 mt-10">{error}</p>
      </div>
    </Modal>
  );
}

export default ErrorModal;
