import styles from './SquarePart.module.css';

function SquarePart(props) {
  return (
    <div className="container">
      <div
        className={styles.square}
        style={{
          backgroundColor: `${props.backgroundColor}`,
          color: `${props.corTexto}`
        }}
      >
        <h1 className={styles.title}>{props.title}</h1>
        <p className={styles.percentage}>{props.percentageLeft}</p>
        <div className={styles.progressBarBackground}>
          <div className={styles.progressBarFill}></div>
        </div>
        <p className={styles.kmLeft}>
          {props.distanceLeft}
          <br />
          restantes
        </p>
      </div>
    </div>
  );
}

export default SquarePart;