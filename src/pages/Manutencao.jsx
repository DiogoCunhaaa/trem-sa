
import RectanglePart from '../components/RectanglePart';
import RectanglePartInfo from '../components/RectanglePartInfo';
import SquarePart from '../components/SquarePart';
import SquarePartInfo from '../components/SquarePartInfo';
import SquarePartTest from '../components/SquarePartTest';

function Dashboard() {

  return (
    <div className='container'>
      <RectanglePart>
        <RectanglePartInfo
          align={'text-center'}
          wrap={'flex-nowrap'}
          title={'Equipe de Manutenção'}
          description={'Solicitando PARADA daqui 20Km'}
          display={'none'}
        />

        {/*ARRUMAR ARRUMAR ARRUMAR ARRUMAR ARRUMAR ARRUMAR */}
        <div className="mx-auto" style={{borderLeft: '2px solid #2f363f'}}></div>
        {/*ARRUMAR ARRUMAR ARRUMAR ARRUMAR ARRUMAR ARRUMAR */}
      
        <RectanglePartInfo 
          align={'text-center'}
          wrap={'flex-nowrap'}
          title={'Atenção!'}
          description={'Vazamentos de fluídos no freio'}
          display={'none'}
        />
      </RectanglePart>

      <div className="row mt-3">
        <div className="col-6">
          <SquarePartTest backgroundColor={'black'} corTexto={'white'}>
            <SquarePartInfo 
              title={'Reboque'}
              display={'none'}
              
            />
          </SquarePartTest>
        </div>
        <div className="col-6">
          <SquarePartTest>
            <SquarePartInfo 
              title={'Reboque'}
              display={'none'}
              
            />
          </SquarePartTest>
        </div>
      </div>
      
    </div>
  );
}

export default Dashboard;
