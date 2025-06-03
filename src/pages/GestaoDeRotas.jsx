import WeatherInfo from '../components/infos/WeatherInfo';
import PedidosInfo from '../components/infos/PedidosInfo';
import RectanglePart from '../components/RectanglePart';

import { DadosColetados } from '../javascript/DadosColetados';

//array dos produtos
const dadosProduto = [
  {nome: 'Carvão', data: '2025-05-21', peso: 10500, id: '10001'},
  {nome: 'Trigo', data: '2025-03-19', peso: 5000, id: '20001'},
  {nome: 'Lentilha', data: '2025-03-19', peso: 7500, id: '20003'},
];

const coletados = new DadosColetados(dadosProduto);


const quantidade = (dadosProduto.lenght)

function GestaoDeRotas() {
  return (
    <div className='container'>

      <div className="row mt-3">
          <RectanglePart>
            <WeatherInfo />
          </RectanglePart>
      </div>

      <div className="row mt-3">
          <h2 className='mx-4 fw-bold'>Últimos Pedidos</h2>
          <RectanglePart>
            {coletados.buscarPorId('10001').map((item) => (
              <PedidosInfo 
                key={item.id}
                item={{
                  ...item,
                  pesoFormatado: coletados.formatarPeso(item.peso), 
                  dataFormatada: coletados.formatarData(item.data),
                }}
                icon="clock"
              />
            ))}
          </RectanglePart>
      </div>
      <div className="row mt-3">
        <RectanglePart>
            {coletados.buscarPorId('20001').map((item) => (
              <PedidosInfo 
                key={item.id}
                item={{
                  ...item,
                  pesoFormatado: coletados.formatarPeso(item.peso), 
                  dataFormatada: coletados.formatarData(item.data),
                }}
                icon="clock"
              />
            ))}
          </RectanglePart>
      </div>

      
    </div>
  );
}

export default GestaoDeRotas;
