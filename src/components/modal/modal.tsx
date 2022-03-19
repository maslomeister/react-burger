import { useEffect } from "react";
import modalStyles from "./modal.module.css";

interface modalProps {
  children: any;
  title: string;
  closeIcon: JSX.Element;
  onClose: any;
}

function Modal(props: modalProps) {
  useEffect(() => {
    document.body.addEventListener("keydown", closeOnESC);
    return () => {
      document.body.removeEventListener("keydown", closeOnESC);
    };
  }, []);

  const closeOnESC = (e: any) => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  };

  return (
    <div className={modalStyles.main}>
      {props.title ? (
        <div className={`${modalStyles.title} ml-10 mr-10 mt-10`}>
          <p className="text text_type_main-medium">{props.title}</p>
          <div className={modalStyles.close_icon_flex} onClick={props.onClose}>
            {props.closeIcon}
          </div>
        </div>
      ) : (
        <div
          className={`${modalStyles.close_icon_absolute} mr-10 mt-15`}
          onClick={props.onClose}
        >
          {props.closeIcon}
        </div>
      )}
      {props.children}
    </div>
  );
}

export default Modal;
