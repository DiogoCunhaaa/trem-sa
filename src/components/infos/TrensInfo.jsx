import { useState } from 'react';

import styles from '../styles/PedidosInfo.module.css';
import EditarTrensModal from '../modals/EditarTrensModal';
import ExcluirTrensModal from '../modals/ExcluirTrensModal';

function PedidosInfo({ trem }) {
  const [showModalEditarTrens, setShowModalEditarTrens] = useState(false);
  const [showModalExcluirTrens, setShowModalExcluirTrens] = useState(false);

  return (
    <div className='d-flex align-items-center justify-content-between w-100 rounded'>
      <div className='d-flex align-items-center'>
        <div className={`${styles.iconCircle} me-3`}>
          <i className={`bi bi-train-front`}></i>
        </div>
        <strong className={`fw-bold fs-2`}>{trem.nome}</strong>
      </div>

      <div className='d-flex align-items-center gap-4'>
        <div className='text-center'>
          <span className='d-block fw-bold small'>CONDUTOR</span>
          <span>{trem.condutor}</span>
        </div>
        <div className='text-center'>
          <span className='d-block fw-bold small'>ID</span>
          <span className='fw-bold'>{trem.id}</span>
        </div>
      </div>

      <div className='d-flex align-items-center gap-4'>
        <div className='d-flex align-items-center'>
          <div className={`${styles.iconCircleTrash}`}>
            <button onClick={() => setShowModalExcluirTrens(true)}>
              <i className={`bi bi-trash-fill`}></i>
            </button>
          </div>
        </div>

        <div className='d-flex align-items-center'>
          <div className={`${styles.iconCirclePen}`}>
            <button onClick={() => setShowModalEditarTrens(true)}>
              <i className={`bi bi-pencil-fill`}></i>
            </button>
          </div>
        </div>
      </div>

      <EditarTrensModal
        trem_id={trem.id}
        show={showModalEditarTrens}
        onClose={() => setShowModalEditarTrens(false)}
        onConfirm={() => {
          console.log('Trem Editado');
          setShowModalEditarTrens(false);
        }}
      />

      <ExcluirTrensModal
        show={showModalExcluirTrens}
        onClose={() => setShowModalExcluirTrens(false)}
        onConfirm={() => {
          console.log('Trem Exluido');
          setShowModalExcluirTrens(false);
        }}
      />
    </div>
  );
}

export default PedidosInfo;
