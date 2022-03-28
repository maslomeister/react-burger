import React from "react";

import nutritionItemStyles from "./nutrition-item.module.css";

interface NutritionItemTypes {
  name: string;
  value: number;
}

export default function NutritionItem({ name, value }: NutritionItemTypes) {
  return (
    <div className={nutritionItemStyles["nutrition__item"]}>
      <p
        className={`${nutritionItemStyles.text} text text_type_main-small text_color_inactive`}
      >
        {name}
      </p>
      <p className="text text_type_digits-default text_color_inactive">
        {value}
      </p>
    </div>
  );
}
