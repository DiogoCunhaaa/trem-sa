import { useState } from 'react';
import styles from '../cadastro/ForgotPasswordModal.module.css';
import { motion } from 'framer-motion';

function MudarRotaModal({ show, onClose, onConfirm }) {
  const [novaRota, setNovaRota] = useState('');

  if (!show) return null;

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
        <h4 className='text-center mt-3 text-danger fw-bold'>Mudar Rota</h4>
        <p className='text-center mt-2'>
          Digite a <strong>nova</strong> estacao destino:
        </p>

        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onConfirm(novaRota);
            }}
          >
            <input
              type='text'
              id='novaRota'
              className={`w-100 ${styles.customInput}`}
              placeholder='Ex: Floresta'
              value={novaRota}
              onChange={(e) => setNovaRota(e.target.value)}
              required
              autoFocus
            />
            <div className='d-flex justify-content-between mt-4 gap-2'>
              <button
                type='button'
                className={`custom-button ${styles.customButton}`}
                onClick={onClose}
              >
                Cancelar
              </button>
              <button
                type='submit'
                className={`custom-button ${styles.customButton}`}
                style={{ backgroundColor: '#000000', color: '#ffffff' }}
              >
                Confirmar Nova Rota
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default MudarRotaModal;
