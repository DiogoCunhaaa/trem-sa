import { useState } from 'react';
import styles from '../cadastro/ForgotPasswordModal.module.css';
import { motion } from 'framer-motion';

export default function CriarTrensModal({ show, onClose, onConfirm }) {
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
        <h4 className='text-center text-warning fw-bold'>Editar Trem</h4>
        <p className= 'text-center mt-2'>
          Digite as informações para <strong>editar</strong> o trem.
        </p>

        <div>
          <input className={`${styles.customInput} text-center w-100`} type="text" placeholder='Modelo' />
          <input className={`${styles.customInput} text-center w-100`} type="email" placeholder='Email do Condutor' />
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
            onClick={onConfirm}
          >
            Confirmar
          </button>
        </div>
      </motion.div>
    </div>
  );
}
