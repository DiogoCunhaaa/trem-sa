import styles from './SquarePart.module.css';

function SquarePart() {
    return (
        <div className={styles.square}>
            <h1 className={styles.title}>Trajeto</h1>
            <p className={styles.percentage}>42% completo</p>
            <div className={styles.progressBarBackground}>
                <div className={styles.progressBarFill}></div>
            </div>
            <p className={styles.kmLeft}>180 km<br />restantes</p>
        </div>
    );
}

export default SquarePart;
