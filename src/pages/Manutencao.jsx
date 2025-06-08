import RectanglePart from '../components/RectanglePart';
import ButtonInfo from '../components/infos/ButtonInfo';
import ManutencaoInfo from '../components/infos/ManutencaoInfo';
import SmallInfo from '../components/infos/SmallInfo';
import Mensagens from '../javascript/Mensagens';

function Manutencao() {
  //MENSAGENS DE MANUTENCAO
  const manutencaoMensagens = [
    {
      id: '1',
      nome: 'Manutenção nos Trilhos',
      msg: Mensagens.gerarMensagensManutencao(30),
    },
    {
      id: '2',
      nome: 'Possível Obstrução',
      msg: Mensagens.gerarMensagensObstrucao('alagamento'),
    }, //motivo da obstrucao
    {
      id: '3',
      nome: 'Próximo Ponto de Manutenção',
      msg: Mensagens.gerarMensagensPontoManutencao(15),
    },
    {
      id: '4',
      nome: 'Equipe de Manutenção',
      msg: Mensagens.gerarMensagensEqpManutencao(20),
    },
    { id: '5', nome: 'Atenção', msg: Mensagens.gerarMensagensAtencao(25) },
  ];

  return (
    <div className='container'>
      <div className='row mt-3'>
        <div className='col-12'>
          <RectanglePart>
            <div className='d-flex flex-column flex-md-row justify-content-between align-items-center text-center'>
              <div className='flex-fill'>
                {manutencaoMensagens
                  .filter((item) => item.id === '4')
                  .map((item) => (
                    <ManutencaoInfo
                      key={item.id}
                      title={item.nome}
                      msg={item.msg}
                    />
                  ))}
              </div>

              <div
                className='d-none d-md-block'
                style={{
                  width: '1px',
                  backgroundColor: '#333',
                  height: '100px',
                }}
              ></div>

              <div className='flex-fill mt-3 md-0'>
                {manutencaoMensagens
                  .filter((item) => item.id === '5')
                  .map((item) => (
                    <ManutencaoInfo
                      key={item.id}
                      title={item.nome}
                      msg={item.msg}
                    />
                  ))}
              </div>
            </div>
          </RectanglePart>
        </div>
      </div>

      <div className='row mt-3'>
        <div className='col-6'>
          <RectanglePart
            backgroundColor={'black'}
          >
            <ButtonInfo 
              title={'Reboque'}
              textColor={'white'}
              buttonTitle={'Solicitar Reboque'}
              backgroundColor={'#b8b8b8'}
            />
          </RectanglePart>
        </div>
      </div>

      <div className='row mt-3'>
        <div className='col-6'>
          <RectanglePart>
            {manutencaoMensagens
              .filter((item) => item.id === '1')
              .map((item) => (
                <SmallInfo key={item.id} title={item.nome} msg={item.msg} />
              ))}
          </RectanglePart>
        </div>

        <div className='col-6'>
          <RectanglePart>
            {manutencaoMensagens
              .filter((item) => item.id === '2')
              .map((item) => (
                <SmallInfo key={item.id} title={item.nome} msg={item.msg} />
              ))}
          </RectanglePart>
        </div>
      </div>
    </div>
  );
}
export default Manutencao;
