import RectanglePart from '../components/RectanglePart';
import AlertasInfo from '../components/infos/AlertasInfo';
import Mensagens from '../javascript/Mensagens';

function Dashboard() {

  const alertasMensagens = [
    {id: '1', nome: 'Freio degastado', msg: ''},
    {id: '2', nome: 'Nível de combustível', msg: ''},
    {id: '3', nome: 'Horário de partida', msg: Mensagens.gerarMensagensPartida()},
  ]

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-12">
          <RectanglePart>

            {alertasMensagens.filter(item => item.id === '3').map(item => (
              <AlertasInfo 
                key={item.id}
                title={item.nome}
                msg={item.msg}
              />
            ))}

          </RectanglePart>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
