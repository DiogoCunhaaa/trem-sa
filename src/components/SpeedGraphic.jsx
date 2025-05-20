import styles from './SpeedGraphic.module.css'

function SpeedGraphic() {
    //DADOS GRAFICO 
    const dadosVelocidade = [
        { hora: "8:00", velocidade: 10},
        { hora: "10:00", velocidade: 30},
        { hora: "12:00", velocidade: 35},
        { hora: "14:00", velocidade: 40},
        { hora: "16:00", velocidade: 60},
        { hora: "18:00", velocidade: 70},
        { hora: "20:00", velocidade: 90},
        { hora: "21:00", velocidade: 40},
    ];
    
    const maxVelocidade = 100;
    
    return(
        <div className="p-4 bg-light rounded shadow-sm">
            <h5 className="fw-bold">Velocidade</h5>
            <div className="velocidadeChart d-flex align-items-end">
                {dadosVelocidade.map((item, index) => (
                    <div key={index} className="text-center mx-1">
                        <div className="bar bg-secondary" style={{height: `${(item.velocidade / maxVelocidade) * 100}%` }} title={`${item.velocidade} km/h`}></div>
                        <small className="d-block mt-1">{item.hora}</small>
                    </div>
                ))}
            </div>
            <small className="fw-bold d-block mt-3">km/h</small>
        </div>
    );
}

export default SpeedGraphic;