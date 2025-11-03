import styles from '../components/cadastro/InputField.module.css';

function Perfil() {
  const user = JSON.parse(sessionStorage.getItem('user'));

  return (
    <div className='container'>
      <div>
        <img
          src='/favicon.ico'
          className='mx-auto d-block shadow-sm rounded-circle'
          alt='icone'
          width='200px'
          height='200px'
        />
      </div>

      <div className='text-center my-3'>
        <h4>SEU PERFIL</h4>
      </div>

      <div className='center shadow p-4 mb-3 bg-body rounded d-flex justify-content-between align-items-center'>
        <span>
          Seu nome de usuário é <strong>{user.nome}.</strong>
        </span>

        <div className={`${styles.customInput} w-50`}>
          <input type='text' placeholder='Alterar nome de usuário' />
        </div>
      </div>

      <div className='center shadow p-4 mb-3 bg-body rounded d-flex justify-content-between align-items-center'>
        <span>
          Seu e-mail é <strong>{user.email}</strong>
        </span>
        <div className={`${styles.customInput} w-50`}>
          <input type='text' placeholder='Alterar email' />
        </div>
      </div>

      <div className='center shadow p-4 mb-5 bg-body rounded d-flex justify-content-between align-items-center'>
        <span>Sua senha é "*****"</span>
        <div className={`${styles.customInput} w-50`}>
          <input type='text' placeholder='Alterar senha' />
        </div>
      </div>
    </div>
  );
}

export default Perfil;
