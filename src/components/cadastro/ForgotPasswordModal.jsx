import { useState } from 'react';
import styles from './ForgotPasswordModal.module.css'

function ForgotPasswordModal({ show, onClose }) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!show) return null;

  async function handleSubmit(e) {
    e?.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      alert('Por favor, informe um email.');
      return;
    }

    try {
      setIsSubmitting(true);
      const API_URL = 'http://localhost:3333';
      
      // Para fins de demonstração, vamos simular o envio da senha
      // Em um ambiente real, isso seria feito pelo backend
      setTimeout(() => {
        // Simulando uma resposta de sucesso
        alert(`Senha enviada com sucesso para o email: ${trimmed}`);
        onClose();
        setIsSubmitting(false);
      }, 1500);
      
      // Código comentado para quando o backend estiver pronto
      /*
      const res = await fetch(`${API_URL}/api/users/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email_usuario: trimmed }),
      });

      const resultado = await res.json();
      if (res.ok) {
        alert(resultado.message || 'Enviamos sua senha cadastrada para seu email.');
        onClose();
      } else {
        alert(resultado.error || 'Não foi possível enviar a senha. Verifique o email e tente novamente.');
      }
      */
    } catch (err) {
      console.error(err);
      alert('Erro ao conectar com o servidor.');
      setIsSubmitting(false);
    }
  }

  return (
    <div className="modal d-block" tabIndex={1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Recuperar Senha</h5>
            <button type="button" className="btn-close" onClick={onClose} disabled={isSubmitting}></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <label htmlFor="resetEmail" className='form-label'>Digite seu email:</label>
              <input
                type="email"
                id="resetEmail"
                className={`w-100 ${styles.customInput}`}
                placeholder='exemplo@exemplo.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="modal-footer">
              <button type="button" className={`custom-button ${styles.customButton}`} onClick={onClose} disabled={isSubmitting}>
                Cancelar
              </button>
              <button
                type="submit"
                className={`custom-button ${styles.customButton}`}
                style={{ backgroundColor: '#000000', color: '#ffffff' }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar link de redefinição'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordModal;