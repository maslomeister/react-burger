import React from "react";
import { motion } from "framer-motion";

import checkIconBackgroundOuter from "../../assets/images/order-details/outer-icon.svg";
import checkIconBackgroundMiddle from "../../assets/images/order-details/middle-icon.svg";
import checkIconBackgroundInner from "../../assets/images/order-details/inner-icon.svg";

import animatedLoadingStyles from "./animated-loading.module.css";

export default function AnimatedLoading() {
  return (
    <>
      <motion.img
        className={animatedLoadingStyles["check-mark-icon_background-center"]}
        src={checkIconBackgroundOuter}
        alt="outerBackground"
        initial={{ rotate: 0 }}
        animate={{ rotate: -360 }}
        transition={{
          rotate: {
            duration: 10,
            ease: "linear",
            repeat: Infinity,
          },
        }}
      />
      <motion.img
        className={animatedLoadingStyles["check-mark-icon_background-center"]}
        src={checkIconBackgroundMiddle}
        alt="middleBackground"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          rotate: {
            duration: 10,
            ease: "linear",
            repeat: Infinity,
          },
        }}
      />
      <motion.img
        className={animatedLoadingStyles["check-mark-icon_background-center"]}
        src={checkIconBackgroundInner}
        alt="innerBackground"
        initial={{ rotate: 0 }}
        animate={{ rotate: -360 }}
        transition={{
          rotate: {
            duration: 10,
            ease: "linear",
            repeat: Infinity,
          },
        }}
      />
    </>
  );
}
