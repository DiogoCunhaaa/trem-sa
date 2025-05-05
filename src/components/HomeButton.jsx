import styles from './HomeButton.module.css';
import { useNavigate } from 'react-router-dom';

function HomeButton(props) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(props.to);
    };

    return (
        <div className={styles.btnTitulo}>
            <button 
                onClick={handleClick}
                className={styles.botao}
                style={{
                    backgroundImage: `url(${props.imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                {props.label}
            </button>
        </div>
    );
}

export default HomeButton;
