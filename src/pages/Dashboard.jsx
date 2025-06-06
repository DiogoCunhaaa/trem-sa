import RectanglePart from '../components/RectanglePart';
import RectanglePartInfo from '../components/RectanglePartInfo';
import BarGraphic from '../components/BarGraphic';
import SquarePart from '../components/SquarePart';
import SquarePartInfo from '../components/SquarePartInfo';
import { ProgressBar } from 'react-bootstrap';

function Dashboard() {
  //BARRA DE PROGRESSO COMECINHO DO DASHBOARD
  const progressBarAmount = 42;
  const restanteProgressBar = 180
  const progressBarText = `${restanteProgressBar}km\n restantes`


  return (
    <div className='container' style={{backgroundColor: '#FBFCF8'}}>
      <div className="row">

        <div className="col-6">
          <SquarePart backgroundColor={'black'} corTexto={'white'}>
            <SquarePartInfo 
              title={'Trajeto'}
              display={'none'}
            />
            <p>42% completo</p>
            <ProgressBar variant='link' style={{backgroundColor: '#b8b8b8'}} now={progressBarAmount} label={`${progressBarAmount}`} visuallyHidden />
            <p className='mt-2' style={{whiteSpace: 'pre-line'}}>{progressBarText}</p>
          </SquarePart> 
        </div>

        <div className="col-6">
          <SquarePart>
            <SquarePartInfo 
              title={'Combustível'}
              display={'none'}
            />
            <p>42% completo</p>
            <ProgressBar variant='link' style={{backgroundColor: '#b8b8b8'}} now={progressBarAmount} label={`${progressBarAmount}`} visuallyHidden />
            <p className='mt-2' style={{whiteSpace: 'pre-line'}}>{progressBarText}</p>
          </SquarePart> 
        </div>

      </div>
         
    
      <div className="row mt-3">
        <div className="col-12">
          <RectanglePart backgroundColor="#d9d9d9">
            <div className="pe-4">
              <RectanglePartInfo
                title={"Saída"}
                horario="08:00 AM"
                data="21 Jan, 2025"
                corTexto="black"
                icone={<i className="bi bi-sunrise"></i>}
              />
            </div>

            {/*ARRUMAR ARRUMAR ARRUMAR ARRUMAR ARRUMAR ARRUMAR */}
            <div className='mx-auto' style={{borderLeft: '2px solid #2f363f'}}></div>
            {/*ARRUMAR ARRUMAR ARRUMAR ARRUMAR ARRUMAR ARRUMAR */}
            
            <div className="d-flex">
              <RectanglePartInfo 
                title={"Chegada"}
                horario="09:00 PM"
                data="22 Jan, 2025"
                corTexto="black"
                icone={<i className="bi bi-moon"></i>}
              />
            </div>
          </RectanglePart>
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-md-12">
          <h2 className='mx-4 fw-bold'>Velocidade</h2>
            <RectanglePart>
              <BarGraphic />
            </RectanglePart>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;