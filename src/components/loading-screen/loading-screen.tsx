import React from "react";
import { AnimatePresence, motion } from "framer-motion";

import { AnimatedLoading } from "../animated-loading/animated-loading";

import styles from "./loading-screen.module.css";

export function LoadingScreen({
  text,
  size,
}: {
  text: string;
  size?: "small" | "medium" | "large";
}) {
  return (
    <AnimatePresence>
      <motion.div className={styles["container"]}>
        <p
          className={`${styles["loading-text"]} text text_type_main-large mb-5`}
        >
          {text}
        </p>
        <div className={styles["loading-icon"]}>
          <AnimatedLoading size={size} />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
