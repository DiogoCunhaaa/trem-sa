import { useState, useEffect } from 'react';
import styles from '../cadastro/ForgotPasswordModal.module.css';
import { motion } from 'framer-motion';

export default function EditarEstacaoModal({ estacao, show, onClose, onConfirm }) {
  const [nomeEstacao, setNomeEstacao] = useState('');
  const [cidadeEstacao, setCidadeEstacao] = useState('');
  const [bairroEstacao, setBairroEstacao] = useState('');
  const [ruaEstacao, setRuaEstacao] = useState('');
  const [numeroEstacao, setNumeroEstacao] = useState('');

  // Carrega os dados ao abrir o modal
  useEffect(() => {
    if (estacao && show) {
      setNomeEstacao(estacao.nome_estacao || '');
      setCidadeEstacao(estacao.cidade_estacao || '');
      setBairroEstacao(estacao.bairro_estacao || '');
      setRuaEstacao(estacao.rua_estacao || '');
      setNumeroEstacao(estacao.numero_estacao || '');
    }
  }, [estacao, show]);

  if (!show) return null;

  async function editarEstacao() {
    try {
      const API_URL = 'http://localhost:3333';

      const res = await fetch(`${API_URL}/api/stations/edit`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: estacao.id_estacao,
          estacao_nome: nomeEstacao,
          estacao_cidade: cidadeEstacao,
          estacao_bairro: bairroEstacao,
          estacao_rua: ruaEstacao,
          estacao_numero: numeroEstacao,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message || 'Estação editada com sucesso');
      } else {
        alert(data.error || 'Erro ao editar estação');
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
        <h4 className='text-center text-warning fw-bold'>Editar Estação</h4>

        <div>
          <input
            className={`${styles.customInput} text-center w-100`}
            type='text'
            value={nomeEstacao}
            onChange={(e) => setNomeEstacao(e.target.value)}
            placeholder='Nome'
          />

          <input
            className={`${styles.customInput} text-center w-100`}
            type='text'
            value={cidadeEstacao}
            onChange={(e) => setCidadeEstacao(e.target.value)}
            placeholder='Cidade'
          />

          <input
            className={`${styles.customInput} text-center w-100`}
            type='text'
            value={bairroEstacao}
            onChange={(e) => setBairroEstacao(e.target.value)}
            placeholder='Bairro'
          />

          <input
            className={`${styles.customInput} text-center w-100`}
            type='text'
            value={ruaEstacao}
            onChange={(e) => setRuaEstacao(e.target.value)}
            placeholder='Rua'
          />

          <input
            className={`${styles.customInput} text-center w-100`}
            type='number'
            value={numeroEstacao}
            onChange={(e) => setNumeroEstacao(e.target.value)}
            placeholder='Número'
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
            style={{ backgroundColor: '#000', color: '#fff' }}
            onClick={async () => {
              await editarEstacao();
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
