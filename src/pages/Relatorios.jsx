import RectanglePart from "../components/RectanglePart";
import SmallInfo from "../components/infos/SmallInfo";
import TimeInfo from "../components/infos/TimeInfo";
import Mensagens from "../javascript/Mensagens";
import Graphic from "../components/Graphic";

function Relatorios() {

  //MENSAGENS DE RELATORIO
  const relatoriosMensagens = [
    {id: '1', nome: 'Consumo Energético', msg: Mensagens.gerarMensagensConsumo(162) },
    {id: '2', nome: 'Parada para Abastecimento', msg: Mensagens.gerarMensagensAbastecimento()}
  ];

  const dadosPassageiros = [
    { hora: '08:00', passageiros: 200 },
    { hora: '10:00', passageiros: 300 },
    { hora: '12:00', passageiros: 500 },
    { hora: '14:00', passageiros: 300 },
    { hora: '16:00', passageiros: 400 },
    { hora: '18:00', passageiros: 600 },
    { hora: '20:00', passageiros: 400 },
    { hora: '21:00', passageiros: 200 },
  ]

  return (
    <div className="container">

      <div className="row mt-3">

        <div className="col-6">
        <RectanglePart>
        {relatoriosMensagens.filter(item => item.id === '2').map(item => (
          <SmallInfo 
            key={item.id}
            title={item.nome}
            msg={item.msg}
          />
        ))}
        </RectanglePart>
        </div>

        <div className="col-6">
        <RectanglePart 
          backgroundColor='black'
        >
        {relatoriosMensagens.filter(rel => rel.id === '1').map(item => (
          <SmallInfo 
            key={item.id}
            title={item.nome}
            msg={item.msg}
            textColor={'text-white'}
          />
        ))}
        </RectanglePart>
        </div>

      </div>

      <div className="row mt-3">
        <div className="col-12">
          <RectanglePart
            backgroundColor='black'
          >
            <TimeInfo />
          </RectanglePart>
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-md-12">
          <h2 className='mx-4 fw-bold'>Passageiros</h2>
            <RectanglePart>
              <Graphic 
                label={'Nº de passageiros'}
                barDataKey={'passageiros'}
                data={dadosPassageiros}
              />
            </RectanglePart>
        </div>
      </div>
          
    </div>
  );
}

export default Relatorios;
