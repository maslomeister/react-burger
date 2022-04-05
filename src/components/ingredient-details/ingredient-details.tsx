import { motion } from "framer-motion";

import Modal from "../../components/modal/modal";
import NutritionItem from "./components/nutrition-item/nutrition-item";
import { useAppSelector } from "../../services/hooks";

import ingredientDetailsStyles from "./ingredient-details.module.css";

interface IngredientDetailsTypes {
  onClose: () => void;
}

export default function IngredientDetails({ onClose }: IngredientDetailsTypes) {
  const {
    modalImage,
    modalName,
    modalCalories,
    modalProteins,
    modalFat,
    modalCarbohydrates,
  } = useAppSelector((state) => state.ingredientDetails);

  return (
    <Modal onClose={onClose} title="Детали ингредиента" closeIconType="primary">
      <div className={ingredientDetailsStyles["ingredient-details"]}>
        <motion.img
          alt="previewImage"
          src={modalImage}
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
          {modalName}
        </p>
        <div
          className={`${ingredientDetailsStyles["ingredient-details__nutrition"]} mb-15 mt-8`}
        >
          <NutritionItem name={"Калории,ккал"} value={modalCalories} />
          <NutritionItem name={"Белки, г"} value={modalProteins} />
          <NutritionItem name={"Жиры, г"} value={modalFat} />
          <NutritionItem name={"Углеводы, г"} value={modalCarbohydrates} />
        </div>
      </div>
    </Modal>
  );
}
