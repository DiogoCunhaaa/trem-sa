import styles from './PedidosInfo.module.css';

function PedidosInfo({ whatFor }) {
    //PARA O ICON DOS STATUS DO PEDIDO
    const label = whatFor.toLowerCase();
    const isDone = label.includes('done');  
    
    const iconClass = isDone ? 'bi-hand-thumbs-up' : 'bi-clock';   

    //
    const dadosData = [
        {data: '21/03/25', peso:'10.500 kg', id: '10001'},
        {data: '21/03/25', peso:'5.000 kg', id: '20001'},
        {data: '21/03/25', peso:'7.500 kg', id: '20003'},
    ]

    return(
        <div className='d-flex align-items-center justify-content-between w-100'>

            <div className='d-flex'>
                {}
                <div className={`${styles.iconCircle} me-3`}>
                    <i className={`bi ${iconClass}`} ></i>
                </div>
                <strong className={`fw-bold fs-2`}>Carvão</strong>  
            </div>
            
            <div>
                <div className='text-center'>
                    <p className='fw-semibold'>DATA</p>
                    <p>dadada</p>
                </div>
            </div>

        </div>
    )
};

export default PedidosInfo;