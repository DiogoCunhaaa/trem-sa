import styles from './styles/RectanglePart.module.css';

function RectanglePart(props) {
    return (
        <div className="w-100 h-100">
            <div className={styles.square} style={{ backgroundColor: props.backgroundColor}}>
                <div className='d-flex justify-content-center w-100 h-100'>
                    {props.children}
                </div>
            </div>    
        </div>
    )
};
export default RectanglePart;