import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from './InputField';
import LoginButton from './LoginButton';
import styles from './CadastroForm.module.css';

function CadastroForm({ onLoginSuccess }) {
  const [usuario, setUsuario] = useState('');
  const [CPF, setCPF] = useState('');
  const [CNH, setCNH] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const navigate = useNavigate();

  async function adicionarUsuario() {
    try {
      const API_URL = 'http://localhost:3333';

      if (senha !== confirmarSenha) {
        alert('As senhas não coincidem');
        return;
      }

      const res = await fetch(`${API_URL}/api/users/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email_usuario: email,
          nome_usuario: usuario,
          cpf_usuario: CPF,
          cnh_usuario: CNH,
          senha_usuario: senha,
        }),
      });

      const resultado = await res.json();

      if (res.ok) {
        alert(resultado.message || 'Cadastro realizado com sucesso');
        localStorage.setItem('loggedIn', 'true');
        sessionStorage.setItem('user', JSON.stringify(resultado.user));
        onLoginSuccess?.();
        navigate('/');
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao conectar com o servidor.');
    }
  }

  const redirectToGoogle = () => {
    window.location.href = 'https://myaccount.google.com/';
  };

  const redirectToFacebook = () => {
    window.location.href =
      'https://pt-br.facebook.com/login/device-based/regular/login/';
  };

  return (
    <div className='container max-w-md mx-auto mt-10 p-4'>
      <div className='text-center my-3'>
        <h4 className='text-lg fw-bold'>TRAIN TRACKER SYSTEM</h4>
      </div>

      <div className='row mt-2'>
        <InputField
          whatFor={'Usuário'}
          onChange={(e) => setUsuario(e.target.value)}
        />
      </div>
      <div className='row mt-2'>
        <InputField whatFor={'CPF'} onChange={(e) => setCPF(e.target.value)} />
      </div>
      <div className='row mt-2'>
        <InputField whatFor={'CNH'} onChange={(e) => setCNH(e.target.value)} />
      </div>
      <div className='row mt-2'>
        <InputField
          whatFor={'Email'}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className='row mt-2'>
        <InputField
          whatFor={'Senha'}
          onChange={(e) => setSenha(e.target.value)}
        />
      </div>
      <div className='row mt-2'>
        <InputField
          whatFor={'Repetir senha'}
          onChange={(e) => setConfirmarSenha(e.target.value)}
        />
      </div>

      <button onClick={adicionarUsuario} className={`${styles.customButton}`}>
        CADASTRAR
      </button>

      <div className='d-flex justify-content-end align-items-end'>
        <div
          className={`${styles.iconCircle} me-2`}
          onClick={redirectToFacebook}
          style={{ cursor: 'pointer' }}
        >
          <i className='bi bi-facebook fs-2 m-0 p-0'></i>
        </div>

        <div
          className={`${styles.iconCircle} me-2`}
          onClick={redirectToGoogle}
          style={{ cursor: 'pointer' }}
        >
          <i className='bi bi-google fs-2 m-0 p-0'></i>
        </div>
      </div>
    </div>
  );
}

export default CadastroForm;
