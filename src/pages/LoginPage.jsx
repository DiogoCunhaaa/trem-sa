import LoginForm from '../components/cadastro/LoginForm';

import { useAuth } from '../components/autenticacao/AuthContext';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: '#FBFCF8' }}>
      <LoginForm
        onLoginSuccess={() => {
          login();
          navigate('/');
        }}
      />
    </div>
  );
}

export default LoginPage;
