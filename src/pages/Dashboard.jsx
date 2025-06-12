import RectanglePart from '../components/RectanglePart';
import RectanglePartInfo from '../components/RectanglePartInfo';
import Graphic from '../components/Graphic';
import SquarePart from '../components/SquarePart';
import SquarePartInfo from '../components/SquarePartInfo';
import { ProgressBar } from 'react-bootstrap';

const dadosVelocidade = [
    { hora: '08:00', velocidade: 15 },
    { hora: '10:00', velocidade: 30 },
    { hora: '12:00', velocidade: 30 },
    { hora: '14:00', velocidade: 45 },
    { hora: '16:00', velocidade: 60 },
    { hora: '18:00', velocidade: 70 },
    { hora: '20:00', velocidade: 75 },
    { hora: '21:00', velocidade: 30 }
];

function Dashboard() {
  //BARRA DE PROGRESSO COMECINHO DO DASHBOARD
  const progressBarAmount = 42;
  const restanteProgressBar = 180;
  const progressBarText = `${restanteProgressBar}km\n restantes`;

  return (
    <div className='container' style={{ backgroundColor: '#FBFCF8' }}>
      <div className='row'>
        <div className='col-6'>
          <SquarePart backgroundColor={'black'} corTexto={'white'}>
            <SquarePartInfo title={'Trajeto'} display={'none'} />
            <p>42% completo</p>
            <ProgressBar
              variant='link'
              style={{ backgroundColor: '#b8b8b8' }}
              now={progressBarAmount}
              label={`${progressBarAmount}`}
              visuallyHidden
            />
            <p className='mt-2' style={{ whiteSpace: 'pre-line' }}>
              {progressBarText}
            </p>
          </SquarePart>
        </div>

        <div className='col-6'>
          <SquarePart>
            <SquarePartInfo title={'Combustível'} display={'none'} />
            <p>42% completo</p>
            <ProgressBar
              variant='link'
              style={{ backgroundColor: '#b8b8b8' }}
              now={progressBarAmount}
              label={`${progressBarAmount}`}
              visuallyHidden
            />
            <p className='mt-2' style={{ whiteSpace: 'pre-line' }}>
              {progressBarText}
            </p>
          </SquarePart>
        </div>
      </div>

      <div className='row mt-3'>
        <div className='col-12'>
          <RectanglePart backgroundColor='#d9d9d9'>
            <div className='text-start' style={{ minWidth: '136.05px', flex: '1' }}>
              <RectanglePartInfo
                title={'Saída'}
                horario='08:00 AM'
                data='21 Jan, 2025'
                corTexto='black'
                icone={<i className='bi bi-sunrise'></i>}
              />
            </div>
            
            <div
              className='mx-auto'
              style={{ borderLeft: '2px solid #2f363f' }}
            ></div>

            <div className='text-start' style={{ minWidth: '136.05px', flex:'1' }}>
              <RectanglePartInfo
                title={'Chegada'}
                horario='09:00 PM'
                data='22 Jan, 2025'
                corTexto='black'
                icone={<i className='bi bi-moon'></i>}

                
              />
            </div>
          </RectanglePart>
        </div>
      </div>

      <div className='row mt-2'>
        <div className='col-md-12'>
          <h2 className='mx-4 fw-bold'>Velocidade</h2>
          <RectanglePart>
            <Graphic 
              label={'Km/h'}
              data={dadosVelocidade}
              barDataKey={'velocidade'}
            />
          </RectanglePart>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
