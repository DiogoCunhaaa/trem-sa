import styles from './styles/SquarePart.module.css'

function SquarePart({ backgroundColor, children, corTexto, flex, className }) {
    return (
        <div className={className || ""}>
            <div 
                className={styles.square} 
                style={{ backgroundColor, color: corTexto, height: "100%" }}
            >
                <div className={`${flex} h-100`}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default SquarePart;
