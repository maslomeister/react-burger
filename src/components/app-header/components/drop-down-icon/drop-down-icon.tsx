import React from "react";
import { motion } from "framer-motion";

import { ArrowDownIcon } from "@ya.praktikum/react-developer-burger-ui-components";

type TProps = {
  isOpened: boolean;
};

export function DropDownIcon({ isOpened }: TProps) {
  return (
    <motion.div
      initial={{ rotate: 0 }}
      animate={{ rotate: isOpened ? -180 : 0 }}
    >
      <ArrowDownIcon type="primary" />
    </motion.div>
  );
}
