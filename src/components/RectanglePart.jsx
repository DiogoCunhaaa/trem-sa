import styles from './RectanglePart.module.css';

function RectanglePart(props) {
    return (
        <div className="container">
            <div className={styles.square} style={{ backgroundColor: props.backgroundColor}}>
                <div className='d-flex'>
                    {props.children}
                </div>
            </div>    
        </div>
    )
};
export default RectanglePart;