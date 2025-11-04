import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from './InputField';
import LoginButton from './LoginButton';
import ForgotPasswordModal from './ForgotPasswordModal';
import styles from './LoginForm.module.css';

function LoginForm({ onLoginSuccess }) {
  //VALIDACAO DO FORM
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  //MOSTRAR MODAL DO ESQUECI MINHA SENHA
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  async function login() {
    try {
      const API_URL = 'http://localhost:3333';

      const res = await fetch(`${API_URL}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email_usuario: email,
          senha_usuario: senha,
        }),
      });

      const resultado = await res.json();

      if (res.ok) {
        alert(resultado.message || 'Login realizado com sucesso');
        localStorage.setItem('loggedIn', 'true');
        sessionStorage.setItem('user', JSON.stringify(resultado.user));
        
        const user = JSON.parse(sessionStorage.getItem('user'));
        console.log(user);
        
        onLoginSuccess?.();
        navigate('/');
      } else {
        setErro(resultado.error || 'Erro ao fazer login.');
        alert(resultado.error || 'Usuário ou senha incorretos.');
      }
    } catch (err) {
      console.log(err);
      alert('Erro ao conectar com o servidor.');
    }
  }

  return (
    <div className='container'>
      <div>
        <img
          src='/favicon.ico'
          className='mx-auto mt-5 d-block shadow-sm rounded-circle'
          alt='icone'
          width={'200px'}
          height={'200px'}
        />
      </div>
      <div className='text-center my-3'>
        <h4>TRAIN TRACKER SYSTEM</h4>
      </div>

      <div className='row mt-2'>
        <InputField
          whatFor={'Email'}
          whatValue={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className='row'>
        <InputField
          whatFor={'Senha'}
          whatValue={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
      </div>

      <div className='row'>
        <div className='col'>
          <div className='mb-3 form-check mx-3'>
            <input
              type='checkbox'
              className='form-check-input'
              id='rememberMe'
            />
            <label className='form-check-label' htmlFor='rememberMe'>
              Lembrar de Mim
            </label>
          </div>
        </div>
        <div className='col text-end'>
          <div className='mb-3 mx-3 '>
            <button
              type='button'
              className='btn btn-link p-0'
              onClick={() => setShowModal(true)}
            >
              Esqueci Minha Senha
            </button>
          </div>
        </div>
      </div>

      <button onClick={login} className={`${styles.customButton}`}>
        LOGIN
      </button>

      <ForgotPasswordModal
        show={showModal}
        onClose={() => setShowModal(false)}
      />
      <div className='d-flex align-items-center my-3'>
        <div className='flex-grow-1 border-top'></div>
        <span className='mx-2 text-muted small'>ou</span>
        <div className='flex-grow-1 border-top'></div>
      </div>

      <LoginButton whatFor={'CADASTRAR-SE'} />
    </div>
  );
}

export default LoginForm;
