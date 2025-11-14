import styles from '../styles/PedidosInfo.module.css';

function PedidosInfo({ trem }) {
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
          <span className='d-block fw-bold small'>MODELO</span>
          <span>{trem.modelo}</span>
        </div>

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
            <button>
              <i className={`bi bi-trash-fill`}></i>
            </button>
          </div>
        </div>

        <div className='d-flex align-items-center'>
          <div className={`${styles.iconCirclePen}`}>
            <button>
              <i className={`bi bi-pencil-fill`}></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PedidosInfo;
