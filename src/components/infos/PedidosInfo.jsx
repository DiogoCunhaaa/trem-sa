import styles from './PedidosInfo.module.css';

function PedidosInfo({ icon, item }) {
    //PARA O ICON DOS STATUS DO PEDIDO
    const label = icon.toLowerCase();
    const isDone = label.includes('done');  
    const iconClass = isDone ? 'bi-hand-thumbs-up' : 'bi-clock';   

    
    

    return(
        <div className='d-flex align-items-center justify-content-between w-100 rounded'>

            <div className='d-flex align-items-center'>
                
                <div className={`${styles.iconCircle} me-3`}>
                    <i className={`bi ${iconClass}`} ></i>
                </div>
                <strong className={`fw-bold fs-2`}>{item.nome}</strong>  
            </div>


            <div className="d-flex align-items-center gap-4">
                <div className="text-center">
                    <span className="d-block fw-bold small">DATA</span>
                    <span>{item.data}</span>
                </div>

                <div className="text-center">
                    <span className="d-block fw-bold small">PESO</span>
                    <span>{item.peso}</span>
                </div>

                <div className="text-center">
                    <span className="d-block fw-bold small">ID</span>
                    <span className='fw-bold'>{item.id}</span>
                </div>

            </div>

        </div>
    )
};

export default PedidosInfo;