import { motion } from "framer-motion";

import Modal from "../../components/modal/modal";
import NutritionItem from "./components/nutrition-item/nutrition-item";

import ingredientDetailsStyles from "./ingredient-details.module.css";

interface IngredientDetailsProps {
  show: boolean;
  onClose: () => void;
  imageSrc: string;
  name: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
}

export default function IngredientDetails({
  onClose,
  show,
  imageSrc,
  name,
  proteins,
  fat,
  carbohydrates,
  calories,
}: IngredientDetailsProps) {
  return (
    <Modal
      onClose={onClose}
      show={show}
      title="Детали ингредиента"
      closeIconType="primary"
    >
      <div className={ingredientDetailsStyles["ingredient-details"]}>
        <motion.img
          alt="previewImage"
          src={imageSrc}
          initial={{ rotate: -2 }}
          animate={{ rotate: 2 }}
          transition={{
            duration: 1,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
        <p
          className={`${ingredientDetailsStyles["ingredient-details__text"]} text text_type_main-medium mt-4`}
        >
          {name}
        </p>
        <div
          className={`${ingredientDetailsStyles["ingredient-details__nutrition"]} mb-15 mt-8`}
        >
          <NutritionItem name={"Калории,ккал"} value={calories} />
          <NutritionItem name={"Белки, г"} value={proteins} />
          <NutritionItem name={"Жиры, г"} value={fat} />
          <NutritionItem name={"Углеводы, г"} value={carbohydrates} />
        </div>
      </div>
    </Modal>
  );
}
