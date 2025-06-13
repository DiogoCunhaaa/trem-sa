import { useState } from 'react';
import styles from '../cadastro/ForgotPasswordModal.module.css';

function MudarRotaModal({ show, onClose, onConfirm }) {
  const [novaRota, setNovaRota] = useState('');

  if (!show) return null;

  const handleSubmit = () => {
    if (novaRota.trim() !== '') {
      onConfirm(novaRota);
      setNovaRota('');
      onClose();
    }
  };

  return (
    <div
      className='modal d-flex justify-content-center align-items-center'
      style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999 }}
    >
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>Mudar Rota do Trem</h5>
            <button
              type='button'
              className='btn-close'
              onClick={onClose}
            ></button>
          </div>
          <div className='modal-body'>
            <label htmlFor='novaRota' className='form-label'>
              Nova Estação Destino:{' '}
            </label>
            <input
              type='text'
              id='novaRota'
              className={`w-100 ${styles.customInput}`}
              placeholder='Ex: Estação Floresta'
              value={novaRota}
              onChange={(e) => setNovaRota(e.target.value)}
            />
          </div>
          <div className='modal-footer'>
            <button
              className={`custom-button ${styles.customButton}`}
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              className={`custom-button ${styles.customButton}`}
              style={{ backgroundColor: '#000000', color: '#ffffff' }}
              onClick={onConfirm}
            >
              Confirmar Nova Rota
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MudarRotaModal;
