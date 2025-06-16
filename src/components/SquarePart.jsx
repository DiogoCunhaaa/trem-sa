import styles from './styles/SquarePart.module.css'

function SquarePart({ backgroundColor, children, corTexto, flex }) {
    return (
        <div className="h-100">
            <div className={styles.square} style={{ backgroundColor, color: corTexto }}>
                <div className={`${flex} h-100`}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default SquarePart;

