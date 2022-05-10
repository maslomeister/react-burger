import styles from "./error-screen.module.css";

export function ErrorScreen({ text }: { text: string }) {
  return (
    <div className={styles["container"]}>
      <p className={`${styles["loading-text"]} text text_type_main-large mb-5`}>
        {text}
      </p>
    </div>
  );
}
