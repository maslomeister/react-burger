import { AnimatePresence, motion } from "framer-motion";

import styles from "./error-screen.module.css";

export function ErrorScreen({ text }: { text: string }) {
  return (
    <AnimatePresence>
      <motion.div className={styles["container"]}>
        <p
          className={`${styles["loading-text"]} text text_type_main-large mb-5`}
        >
          {text}
        </p>
      </motion.div>
    </AnimatePresence>
  );
}
