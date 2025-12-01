import styles from '../cadastro/ForgotPasswordModal.module.css';
import { motion } from 'framer-motion';

export default function ExluirEstacaoModal({ show, onClose, onConfirm, estacao_id }) {
  if (!show) return null;

  async function excluirEstacao() {
    try {
      const API_URL = 'http://localhost:3333';

      const res = await fetch(`${API_URL}/api/stations/delete/${estacao_id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      const resultado = await res.json();

      if (res.ok) {
        alert(resultado.message || 'Estacao excluida com sucesso.');
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao conectar com o servidor.');
    }
  }

  return (
    <div
      className='modal-overlay'
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
      <motion.div
        className='modal-card'
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: '#fff',
          borderRadius: '16px',
          padding: '2rem',
          maxWidth: '400px',
          boxShadow: '0 0 20px rgba(0,0,0,0.2)',
        }}
      >
        <h4 className='text-center text-danger fw-bold'>Excluir Estacao</h4>
        <p className='text-center mt-2'>
          Tem certeza que deseja <strong>excluir</strong> a estacao?
        </p>

        <div className='d-flex justify-content-between mt-4'>
          <button
            className={`custom-button ${styles.customButton}`}
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className={`custom-button ${styles.customButton}`}
            style={{ backgroundColor: '#000000', color: '#ffffff' }}
            onClick={async () => {
                await excluirEstacao();
                onConfirm();
            }}
          >
            Excluir
          </button>
        </div>
      </motion.div>
    </div>
  );
}
