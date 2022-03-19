import React from "react";
import ModalOverlay from "../../components/modal-overlay/modal-overlay";
import Modal from "../../components/modal/modal";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientDetailsStyles from "./ingredient-details.module.css";

interface ingredientDetailsProps {
  show: boolean;
  onClose: Function;
  imageSrc: string;
  name: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
}

function IngredientDetails(props: ingredientDetailsProps) {
  return (
    <ModalOverlay onClose={props.onClose} show={props.show}>
      <Modal
        onClose={props.onClose}
        title="Детали ингредиента"
        closeIcon={<CloseIcon type="primary" />}
      >
        <div className={ingredientDetailsStyles.main}>
          <img alt="previewImage" src={props.imageSrc} />
          <p
            className={`${ingredientDetailsStyles.name} text text_type_main-medium mt-4`}
          >
            {props.name}
          </p>
          <div className={`${ingredientDetailsStyles.nutrition} mb-15 mt-8`}>
            <div className={ingredientDetailsStyles.item}>
              <p
                className={`${ingredientDetailsStyles.text} text text_type_main-small text_color_inactive`}
              >
                Калории, ккал
              </p>
              <p className="text text_type_digits-default text_color_inactive">
                {props.calories}
              </p>
            </div>
            <div className={ingredientDetailsStyles.item}>
              <p className="text text_type_main-small text_color_inactive">
                Белки, г
              </p>
              <p className="text text_type_digits-default text_color_inactive">
                {props.proteins}
              </p>
            </div>
            <div className={ingredientDetailsStyles.item}>
              <p className="text text_type_main-small text_color_inactive">
                Жиры, г
              </p>
              <p className="text text_type_digits-default text_color_inactive">
                {props.fat}
              </p>
            </div>
            <div className={ingredientDetailsStyles.item}>
              <p className="text text_type_main-small text_color_inactive">
                Углеводы, г
              </p>
              <p className="text text_type_digits-default text_color_inactive">
                {props.carbohydrates}
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </ModalOverlay>
  );
}

export default IngredientDetails;
