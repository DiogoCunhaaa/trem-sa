import RectanglePart from "../components/RectanglePart";
import SmallInfo from "../components/infos/SmallInfo";
import Mensagens from "../javascript/Mensagens";

function Relatorios() {

  //MENSAGENS DE RELATORIO
  const relatoriosMensagens = [
    {id: '1', nome: 'Consumo Energético', msg: Mensagens.gerarMensagensConsumo(162) },
    {id: '2', nome: 'Parada para Abastecimento', msg: Mensagens.gerarMensagensAbastecimento()}
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

      
    </div>
  );
}

export default Relatorios;
