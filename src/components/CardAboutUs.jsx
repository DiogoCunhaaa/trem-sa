import styles from './styles/Card.module.css'

function CardAboutUs(props) {
    return(
        <div className="w-100 h-100">
            <div className={styles.cards} style={{ backgroundColor: props.backgroundColor}}>
                {props.children}
            </div>
        </div>
    )
}

export default CardAboutUs;