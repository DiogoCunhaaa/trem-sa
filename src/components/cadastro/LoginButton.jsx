import { useNavigate } from 'react-router-dom';
import styles from './LoginButton.module.css';

function LoginButton({ whatFor, onLoginClick }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (whatFor === 'CADASTRAR-SE') {
      navigate('/cadastropage');
    } else if (onLoginClick) {
      onLoginClick();
    }
  };

  return (
    <button 
      className={`custom-button ${styles.customButton}`} 
      onClick={handleClick}
    >
      {whatFor}
    </button>
  );
}

export default LoginButton;