import styles from '../styles/PedidosInfo.module.css';

function SensoresInfo({ icon, item }) {
  //PARA O ICON DOS STATUS DO PEDIDO
  const label = icon.toLowerCase();
  const isDone = label.includes('done');
  const iconClass = isDone ? 'bi-hand-thumbs-up' : 'bi-clock';

  return (
    <div className='d-flex align-items-center justify-content-between w-100 rounded'>
      <div className='d-flex align-items-center'>
        <div className={`${styles.iconCircle} me-3`}>
          <i className={`bi ${iconClass}`}></i>
        </div>
        <strong className={`fw-bold fs-4`}>{item.nome}</strong>
      </div>

      <div className='d-flex align-items-center gap-4'>
        <div className='text-center'>
          <span className='d-block fw-bold small'>TIPO</span>
          <span>{item.tipo}</span>
        </div>

        <div className='text-center'>
          <span className='d-block fw-bold small'>HORA</span>
          <span>{item.horario}</span>
        </div>
      </div>

      <div>
        <div className='text-center me-4'>
          <span className='d-block fw-bold small'>VALOR</span>
          <span>{item.valor}</span>
        </div>
      </div>
    </div>
  );
}

export default SensoresInfo;
