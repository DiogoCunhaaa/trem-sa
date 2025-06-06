import RectanglePart from '../components/RectanglePart';
import AlertasInfo from '../components/infos/AlertasInfo';

function Dashboard() {

  return (
    <div style={{backgroundColor: '#FBFCF8'}}>
      <div>
        <RectanglePart>
          <AlertasInfo 
            hour={''}
            title={''}
            description={''}
          />
           
        </RectanglePart>
      </div>
      <div className='my-2'></div>
      <div>
        <RectanglePart>
          <AlertasInfo 
          
          />
        </RectanglePart>
      </div>
      <div className='my-2'></div>
      <div>
        <RectanglePart>
          <AlertasInfo>
            <div>
              
            </div>
          </AlertasInfo>
        </RectanglePart>
      </div>
      <div className='my-2'></div>
      <div>
        <RectanglePart>
          <AlertasInfo>
            <div>
              
            </div>
          </AlertasInfo>
        </RectanglePart>
      </div>
    </div>
  );
}

export default Dashboard;
