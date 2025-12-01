import { useState } from 'react';

import styles from '../styles/PedidosInfo.module.css';
import EditarEstacaoModal from '../modals/EditarEstacaoModal';
// import ExcluirEstacaoModal from '../modals/ExcluirEstacaoModal';

function EstacaoInfo({ estacao, onUpdate }) {
  const [showModalEditarEstacao, setShowModalEditarEstacao] = useState(false);
  const [showModalExcluirEstacao, setShowModalExcluirEstacao] = useState(false);

  return (
    <div className='d-flex align-items-center justify-content-between w-100 rounded'>
      <div className='d-flex align-items-center'>
        <div className={`${styles.iconCircle} me-3`}>
          <i className={`bi bi-train-front`}></i>
        </div>
        <strong className={`fw-bold fs-2`}>{estacao.nome_estacao}</strong>
      </div>

      <div className='d-flex align-items-center gap-4'>
        <div className='text-center'>
          <span className='d-block fw-bold small'>CIDADE</span>
          <span className='fw-bold'>{estacao.cidade_estacao}</span>
        </div>
        <div className='text-center'>
          <span className='d-block fw-bold small'>ID</span>
          <span className='fw-bold'>{estacao.id_estacao}</span>
        </div>
      </div>

      <div className='d-flex align-items-center gap-4'>
        <div className='d-flex align-items-center'>
          <div className={`${styles.iconCircleTrash}`}>
            <button onClick={() => setShowModalExcluirEstacao(true)}>
              <i className={`bi bi-trash-fill`}></i>
            </button>
          </div>
        </div>

        <div className='d-flex align-items-center'>
          <div className={`${styles.iconCirclePen}`}>
            <button onClick={() => setShowModalEditarEstacao(true)}>
              <i className={`bi bi-pencil-fill`}></i>
            </button>
          </div>
        </div>
      </div>

      <EditarEstacaoModal
        estacao={estacao}
        show={showModalEditarEstacao}
        onClose={() => setShowModalEditarEstacao(false)}
        onConfirm={() => {
          setShowModalEditarEstacao(false);
          onUpdate();
        }}
      />

      {/* <ExcluirEstacaoModal
        trem_id={trem.id_trem}
        show={showModalExcluirEstacao}
        onClose={() => setShowModalExcluirEstacao(false)}
        onConfirm={() => {
          setShowModalExcluirEstacao(false);
          onUpdate();
        }}
      /> */}
    </div>
  );
}

export default EstacaoInfo;
