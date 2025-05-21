import styles from './SquarePart.module.css'

function SquarePartTest({ backgroundColor, children, corTexto }) {
    return(
        <div className="container">
            <div className={styles.square} style={{ backgroundColor: backgroundColor, color: corTexto }}>
                <div className="d-flex">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default SquarePartTest;