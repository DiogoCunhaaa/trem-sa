import RectanglePart from '../components/RectanglePart';
import AlertasInfo from '../components/infos/AlertasInfo';

function Dashboard() {

  return (
    <div style={{backgroundColor: '#FBFCF8'}}>
      <div>
        <RectanglePart> 
          <AlertasInfo 
            hour={'10:45 PM'}
            title={'Freio desgastado'}
            description={'Parada recomendada na próxima estação.'}
          />
           
        </RectanglePart>
      </div>
      <div className='my-2'></div>
      <div>
        <RectanglePart>
          <AlertasInfo 
            hour={'10:30 PM'}
            title={'Nivel de combustível'}
            description={'Nivel de combustível inferior a 30%.'}
          />
        </RectanglePart>
      </div>
      <div className='my-2'></div>
      <div>
        <RectanglePart>
          <AlertasInfo
            hour={'08:16 PM'}
            title={'Nivel de combustível'}
            description={'Nivel de combustível inferior a 50%.'}
            />
        </RectanglePart>
      </div>
      <div className='my-2'></div>
      <div>
        <RectanglePart>
          <AlertasInfo
            hour={'07:45 AM'}
            title={'Horário de partida'}
            description={'Horario de partida definido para 15 minutos.'}
            />
        </RectanglePart>
      </div>
    </div>
  );
}

export default Dashboard;
