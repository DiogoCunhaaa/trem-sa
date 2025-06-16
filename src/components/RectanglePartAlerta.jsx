import styles from './styles/RectanglePart.module.css';

function RectanglePartAlerta(props) {
    return (
        <div className="w-100 h-100">
            <div className={styles.square} style={{ backgroundColor: props.backgroundColor}}>
                <div className='d-flex justify-content-start w-100 h-100'>
                    {props.children}
                </div>
            </div>    
        </div>
    )
};
export default RectanglePartAlerta;