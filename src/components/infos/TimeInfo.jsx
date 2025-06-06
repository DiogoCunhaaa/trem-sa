import styles from '../styles/TimeInfo.module.css'

function TimeInfo() {

    const progressBarAmount = 100;

    return (
        <div className="d-flex text-white my-auto">
            <div className="d-flex justify-content-center">
                <h1 className="fs-2 fw-bold w-50 text-center">Tempo Médio de Rota</h1>
            </div>

            <div className="my-auto">
                <div className='d-flex align-items-center gap-2'>
                    <span><i className="bi bi-cloud-rain-heavy"></i></span>
                    <progress className={`rounded w-50 ${styles.whiteProgressBar}`} value={1} />
                    <span className='small'>15 horas</span>
                </div >
                <div className='d-flex align-items-center gap-2'>
                    <span><i className="bi bi-brightness-high"></i></span>
                    <progress className={`rounded w-25 ${styles.whiteProgressBar}`} value={1} />
                    <span className='small'>13 horas</span>
                </div>
                <div className='d-flex align-items-center gap-2'>
                    <span><i className="bi bi-cloud-snow"></i></span>
                    <progress className={`rounded ${styles.whiteProgressBar}`} value={1} />
                    <span className='small'>17 horas</span>
                </div>
                
            </div>

        </div>
        

    )
};

export default TimeInfo;