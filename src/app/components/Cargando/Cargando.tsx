import styles from "./Cargando.module.css";

export default function Cargando() {
    return (
        <div className={styles.spinnerContainer}>
            <div className={styles.spinner}></div>
        </div>
    );
}