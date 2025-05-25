import WeatherInfo from '../components/gestaorotas/WeatherInfo';
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
      
    </div>
  );
}

export default GestaoDeRotas;
