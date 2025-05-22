import styles from './SquarePart.module.css'

function SquarePartTest({ backgroundColor, children, corTexto, flex }) {
    return(
        <div className="container">
            <div className={styles.square} style={{ backgroundColor: backgroundColor, color: corTexto }}>
                <div className={flex}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default SquarePartTest;