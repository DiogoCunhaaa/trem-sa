import styles from './styles/CustomButton.module.css'

function CustomButton({ whatFor, backgroundColor, buttonTextColor,onClick }) {
    return(
        <div className='m-2'> 
            <button className={`${styles.customButton} fw-bold`} style={{ backgroundColor: backgroundColor, color: buttonTextColor}} onClick={onClick}>{whatFor}</button>
        </div>
    )
};

export default CustomButton;