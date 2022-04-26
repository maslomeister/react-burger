import React from "react";
import { motion } from "framer-motion";

import { OuterIcon } from "../../assets/images/order-details/outer-icon";
import { MiddleIcon } from "../../assets/images/order-details/middle-icon";
import { InnerIcon } from "../../assets/images/order-details/inner-icon";

import styles from "./animated-loading.module.css";

export function AnimatedLoading({
  size = "small",
}: {
  size?: "small" | "medium" | "large";
}) {
  let mediumIconDimensions = { width: 0, height: 0 };
  let outerIconDimensions = { width: 0, height: 0 };
  let innerIconDimensions = { width: 0, height: 0 };
  if (size) {
    switch (size) {
      case "small": {
        innerIconDimensions = { width: 68, height: 66 };
        mediumIconDimensions = { width: 98, height: 102 };
        outerIconDimensions = { width: 107, height: 100 };
        break;
      }
      case "medium": {
        innerIconDimensions = { width: 200, height: 194 };
        mediumIconDimensions = { width: 250, height: 260 };
        outerIconDimensions = { width: 300, height: 280 };
        break;
      }
    }
  }
  return (
    <>
      <motion.div
        className={styles["check-mark-icon_background-center"]}
        initial={{ rotate: 0 }}
        animate={{ rotate: -360 }}
        transition={{
          rotate: {
            duration: 10,
            ease: "linear",
            repeat: Infinity,
          },
        }}
      >
        <OuterIcon
          width={outerIconDimensions.width}
          height={outerIconDimensions.height}
        />
      </motion.div>
      <motion.div
        className={styles["check-mark-icon_background-center"]}
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          rotate: {
            duration: 10,
            ease: "linear",
            repeat: Infinity,
          },
        }}
      >
        <MiddleIcon
          width={mediumIconDimensions.width}
          height={mediumIconDimensions.height}
        />
      </motion.div>
      <motion.div
        className={styles["check-mark-icon_background-center"]}
        initial={{ rotate: 0 }}
        animate={{ rotate: -360 }}
        transition={{
          rotate: {
            duration: 10,
            ease: "linear",
            repeat: Infinity,
          },
        }}
      >
        <InnerIcon
          width={innerIconDimensions.width}
          height={innerIconDimensions.height}
        />
      </motion.div>
    </>
  );
}
