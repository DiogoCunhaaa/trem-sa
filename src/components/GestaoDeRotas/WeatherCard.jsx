import RectanglePart from "../RectanglePart";
import styles from './WeatherCard.module.css';

function WeatherCard() {
  return (

    <div>
      <RectanglePart>
        
        <div className="row col-5">
          <div className="location fw-bold fs-4">
            Joinville <i class="bi bi-geo-alt"></i>
          </div>
          <div className="temperature fw-bold fs-1">
            25°C
          </div>
          <div className="weather fw-bold fs-6">
            Tempestade <i class="bi bi-cloud-lightning-rain"></i>
          </div>
        </div>
        <div className="row">
          <div className="visibilidade">
            <p className="m-0 fw-bold" style={{ fontSize: '11px'}}>Visibilidade</p>
            <p className="m-1" style={{ fontSize: '11px'}}>5km</p>
          </div>
          <div className="umidade">
            <p className="m-0 fw-bold" style={{ fontSize: '11px'}}>Umidade</p>
            <p className="m-1" style={{ fontSize: '11px'}}>88%</p>
          </div>
          <div className="vento">
            <p className="m-0 fw-bold" style={{ fontSize: '11px'}}>Vento</p>
            <p className="m-1" style={{ fontSize: '11px'}}>19km/h</p>
          </div>
          <div className="tempMax">
            <p className="m-0 fw-bold" style={{ fontSize: '11px'}}>Máx</p>
            <p className="m-1" style={{ fontSize: '11px'}}>31°C</p>
          </div>
        </div>
        <div className="buttonpause">

        </div>
        <div className="buttonchange">

        </div>
      </RectanglePart>
    </div>

  )
};

export default WeatherCard;