import styles from './RectanglePart.module.css';

function RectanglePart(props) {
    return (
        <div className="container ds-flex">
                <div className={styles.square}
                style={{
                    backgroundColor: props.backgroundColor,
                }}
                >
                    <h1 className={`fs-5 fw-bold {styles.title}`} style={{
                        color: `${props.corTexto}`
                    }}>
                        {props.title}</h1>
                    <h1 className={styles.abertura}>08:00 AM <i className="bi bi-sunrise"></i> </h1> <h1 className={styles.abertura}>09:00 PM<i className="bi bi-moon"></i></h1>
                    <p className={styles.data}>21 Jan,2025 <i className="bi bi-train-front"></i></p> <h1 className={styles.abertura}>22 Jan,2025 <i className="bi bi-train-front"></i></h1>
                    <hr />
                    <div>
                        
                    </div>
                </div>
            

            
        </div>
    )
}
export default RectanglePart