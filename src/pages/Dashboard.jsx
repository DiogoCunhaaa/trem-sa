import SquarePart from '../components/SquarePart';
import RectanglePart from '../components/RectanglePart';
import RectanglePartInfo from '../components/RectanglePartInfo';
import SpeedGraphic from '../components/SpeedGraphic';

function Dashboard() {
  return (
    <div style={{backgroundColor: '#FBFCF8'}}>
    <div className="container">
      <div className="row mt-3">
        <div className="col-6">
          <SquarePart 
            title="Trajeto"
            percentageLeft="42% completo"
            distanceLeft="180 km"
          />
        </div>
        <div className="col-6">
          <SquarePart 
            title="Combustível"
            percentageLeft="80% completo"
            distanceLeft="2400 L"
            backgroundColor="#d9d9d9"
            corTexto="black"
          />
        </div>
      </div>
    </div>
    <div className="container">
      <div className="row mt-3">
        <div className="col-12">
          <RectanglePart backgroundColor="#d9d9d9">
            <RectanglePartInfo
              title={"Saida"}
              horario="08:00 AM"
              data="21 Jan, 2025"
              corTexto="black"
              icone={<i className="bi bi-sunrise"></i>}
            />

            {/*ARRUMAR ARRUMAR ARRUMAR ARRUMAR ARRUMAR ARRUMAR */}
            <div className='mx-auto' style={{borderLeft: '2px solid #2f363f'}}></div>
            {/*ARRUMAR ARRUMAR ARRUMAR ARRUMAR ARRUMAR ARRUMAR */}

            <RectanglePartInfo 
              title={"Chegada"}
              horario="09:00 PM"
              data="22 Jan, 2025"
              corTexto="black"
              icone={<i className="bi bi-moon"></i>}
            />
          </RectanglePart>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="row mt-3">
        <div className="col-md-12">
          <h2 className='mx-4 fw-bold'>Velocidade</h2>
            <RectanglePart>
              <SpeedGraphic />
            </RectanglePart>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Dashboard;