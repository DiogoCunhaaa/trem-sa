import styles from './InputField.module.css';

function InputField({ whatFor, whatValue, onChange }) {
  const label = whatFor.toLowerCase();

  // Ícones apenas para os campos da sua imagem
  const iconMap = {
    usuário: 'bi-person',
    usuario: 'bi-person',
    cpf: 'bi-card-text',
    cnh: 'bi-credit-card-2-front',
    email: 'bi-envelope',
    senha: 'bi-lock',
    repetir: 'bi-lock-fill',
  };

  //  Define o tipo de input
  const inputType = label.includes('senha')
    ? 'password'
    : label.includes('email')
    ? 'email'
    : label.includes('cpf')
    ? 'text'
    : label.includes('cnh')
    ? 'text'
    : 'text';

  //  Encontra o ícone correspondente
  const matchedKey = Object.keys(iconMap).find((key) =>
    label.includes(key)
  );

  const iconClass = iconMap[matchedKey] || 'bi-pencil';

  return (
    <div className={styles.container}>
      <div className={styles.customInput}>
        <div className={styles.iconCircle}>
          <i className={`bi ${iconClass}`}></i>
        </div>
        <input
          type={inputType}
          placeholder={whatFor}
          value={whatValue}
          onChange={onChange}
          className={styles.input}
        />
      </div>
    </div>
  );
}

export default InputField;