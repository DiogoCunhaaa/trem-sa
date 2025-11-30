import { useState } from 'react';
import styles from '../cadastro/ForgotPasswordModal.module.css';
import { motion } from 'framer-motion';

export default function EditarSensorModal({ show, onClose, onConfirm }) {
  const [idSensor, setIdSensor] = useState('');
  const [tipoSensor, setTipoSensor] = useState('');
  const [valorSensor, setValorSensor] = useState('');
  if (!show) return null;

  async function editarSensor() {
    try {
      const API_URL = 'http://localhost:3333';

      const res = await fetch(`${API_URL}/api/sensors/edit`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: idSensor,
          tipo_sensor: tipoSensor,
          valor_sensor: valorSensor,
        }),
      });

      const resultado = await res.json();

      if (res.ok) {
        alert(resultado.message || 'Sensor editado com sucesso');
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
        <h4 className='text-center text-warning fw-bold'>Editar Trem</h4>
        <p className='text-center mt-2'>
          Digite as informações para <strong>editar</strong> o sensor.
        </p>

        <div>
          <input
            className={`${styles.customInput} text-center w-100`}
            type='number'
            placeholder='ID do Sensor'
            onChange={(e) => setIdSensor(e.target.value)}
          />
          <input
            className={`${styles.customInput} text-center w-100`}
            type='text'
            placeholder='Novo Tipo'
            onChange={(e) => setTipoSensor(e.target.value)}
          />
          <input
            className={`${styles.customInput} text-center w-100`}
            type='number'
            placeholder='Novo Valor'
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
              await editarSensor();
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
