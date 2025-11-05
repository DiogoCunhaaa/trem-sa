import { useState } from 'react';
import styles from './ForgotPasswordModal.module.css'

function ForgotPasswordModal({ show, onClose }) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!show) return null;

  async function forgotPassword(e) {
    e?.preventDefault();
    const email_trimmed = email.trim();
    if (!email_trimmed) {
      alert('Por favor, informe um email.');
      return;
    }

    try {
      setIsSubmitting(true);
      const API_URL = 'http://localhost:3333';
      
      const res = await fetch(`${API_URL}/api/users/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email_usuario: email_trimmed }),
      });

      const resultado = await res.json();
      if (res.ok) {
        alert(resultado.message || 'Nova senha enviada para seu email com sucesso!');
        onClose();
      } else {
        alert(resultado.error || 'Não foi possível enviar a senha. Verifique o email e tente novamente.');
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao conectar com o servidor.');
    } finally {
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

          <form onSubmit={forgotPassword}>
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