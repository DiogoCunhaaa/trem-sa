
import RectanglePart from '../components/RectanglePart';
import RectanglePartInfo from '../components/RectanglePartInfo';

import SquarePartInfo from '../components/SquarePartInfo';
import SquarePart from '../components/SquarePart';

function Dashboard() {

  return (
    <div className='container'>

      <div className="row">
        <div className="col-12">
          <RectanglePart>
            <RectanglePartInfo
              align={'text-center'}
              title={'Equipe de Manutenção'}
              titleFontSize={'fs-3'}
              description={'Solicitando PARADA daqui 20Km'}
              display={'none'}
            />

            {/*ARRUMAR ARRUMAR ARRUMAR ARRUMAR ARRUMAR ARRUMAR */}
            <div className="mx-auto" style={{borderLeft: '2px solid #2f363f'}}></div>
            {/*ARRUMAR ARRUMAR ARRUMAR ARRUMAR ARRUMAR ARRUMAR */}
          
            <RectanglePartInfo 
              align={'text-center'}
              title={'Atenção!'}
              description={'Vazamentos de fluídos no freio'}
              display={'none'}
            />
          </RectanglePart>
        </div>
      </div>

      

      <div className="row mt-3">
        <div className="col-6">
          <SquarePart flex="d-flex flex-column" backgroundColor="black" corTexto="white">
            <SquarePartInfo 
              title="Reboque"
              display="none"
              margin="mx-auto"
            />
            <button className="btn btn-light mt-auto mx-auto"> Solicitar Reboque</button>
          </SquarePart>
        </div>

        <div className="col-6">
          <SquarePart flex={'d-flex'}>
            <SquarePartInfo 
              align={'text-center'}
              title={'Manutenção nos Trilhos'}
              description={'Está acontecendo uma manutenção no km 30 dos trilhos'}
              display={'none'}
              margin={'mx-auto'}
            />
          </SquarePart>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
