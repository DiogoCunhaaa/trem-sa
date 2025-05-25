import styles from './CustomButton.module.css'

function CustomButton({ whatFor }) {
    return(
        <div className='m-2'> 
            <button className={`${styles.customButton} fw-bold`}>{whatFor}</button>
        </div>
    )
};

export default CustomButton;