import WeatherInfo from '../components/infos/WeatherInfo';
import PedidosInfo from '../components/infos/PedidosInfo';
import RectanglePart from '../components/RectanglePart';

//
const dadosProduto = [
  {nome: 'Carvão', data: '21/03/25', peso: '10.500 kg', id: '10001'},
  {nome: 'Trigo', data: '21/03/25', peso: '5.000 kg', id: '20001'},
  {nome: 'Lentilha', data: '21/03/25', peso: '7.500 kg', id: '20003'},
];


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
            {dadosProduto.filter((item) => item.id === '10001').map((item) => (
              <PedidosInfo 
              key={item.id}
                item={item}
                icon='clock'
              />
            ))}
          </RectanglePart>
        </div>
      </div>

      
    </div>
  );
}

export default GestaoDeRotas;
