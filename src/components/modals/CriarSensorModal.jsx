import { useState } from 'react';
import styles from '../cadastro/ForgotPasswordModal.module.css';
import { motion } from 'framer-motion';

export default function CriarSensorModal({ show, onClose, onConfirm }) {
  const [tipoSensor, setTipoSensor] = useState('');
  const [valorSensor, setValorSensor] = useState(null);

  if (!show) return null;

  async function adicionarSensor() {
    try {
      const API_URL = 'http://localhost:3333';

      const res = await fetch(`${API_URL}/api/sensors/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tipo_sensor: tipoSensor,
          valor_sensor: valorSensor,
        }),
      });

      const resultado = await res.json()

      if (res.ok) {
        alert(resultado.message || 'Sensor criado com sucesso');
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
        <h4 className='text-center text-success fw-bold'>Criar Trem</h4>
        <p className='text-center mt-2'>
          Digite as informações para <strong>criar</strong> o trem.
        </p>

        <div>
          <input
            className={`${styles.customInput} text-center w-100`}
            type='text'
            placeholder='Tipo do Sensor'
            onChange={(e) => setTipoSensor(e.target.value)}
          />
          <input
            className={`${styles.customInput} text-center w-100`}
            type='number'
            placeholder='Valor do Sensor'
            onChange={(e) => setValorSensor(e.target.value)}
          />
        </div>

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
              await adicionarSensor();
              onConfirm();
            }}
          >
            Confirmar
          </button>
        </div>
      </motion.div>
    </div>
  );
}
