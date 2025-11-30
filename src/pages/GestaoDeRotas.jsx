import PedidosInfo from '../components/infos/PedidosInfo';
import RectanglePart from '../components/RectanglePart';
import MapaInterativo from '../components/MapaInterativo';

import { DadosColetados } from '../javascript/DadosColetados';

//array dos produtos
const dadosProduto = [
  { nome: 'Carvão', data: '2025-05-21', peso: 10500, id: '10001' },
  { nome: 'Trigo', data: '2025-03-19', peso: 5000, id: '20001' },
  { nome: 'Lentilha', data: '2025-03-19', peso: 7500, id: '20003' },
];

const coletados = new DadosColetados(dadosProduto);

function GestaoDeRotas() {
  //id dos produtos que vao ser mostrados
  const pedidosId = ['10001', '20001', '20003'];

  return (
    <div className='container'>
      <div className='row mt-3'>
        <h2 className='mx-4 fw-bold'>Mapa Interativo</h2>
        <RectanglePart>
          <MapaInterativo />
        </RectanglePart>
      </div>

      <div className='row mt-3'>
        <h2 className='mx-4 fw-bold'>Últimos Pedidos</h2>
        {pedidosId.map((id) => {
          const item = coletados.buscarPorId(id);
          if (!item) return null;
          return (
            <div key={item.id} className='mt-2'>
              <RectanglePart>
                <PedidosInfo
                  key={item.id}
                  item={{
                    ...item,
                    pesoFormatado: coletados.formatarPeso(item.peso),
                    dataFormatada: coletados.formatarData(item.data),
                  }}
                  icon={'clock'}
                />
              </RectanglePart>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GestaoDeRotas;
