import WeatherInfo from '../components/infos/WeatherInfo';
import PedidosInfo from '../components/infos/PedidosInfo';
import RectanglePart from '../components/RectanglePart';


function GestaoDeRotas() {
  return (
    <div className='container'>

      <div className="row mt-3">
        <div className="col">
          <RectanglePart>
            <WeatherInfo />
          </RectanglePart>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <h2 className='mx-4 fw-bold'>Últimos Pedidos</h2>
          <RectanglePart>
            <PedidosInfo 
              whatFor={'done'}
            />
          </RectanglePart>
        </div>
      </div>

      
    </div>
  );
}

export default GestaoDeRotas;
