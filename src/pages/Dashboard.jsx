import SquarePart from '../components/SquarePart';
import RectanglePart from '../components/RectanglePart';

function Dashboard() {
  return (
    <>
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
        <RectanglePart
          title="Saída"
          corTexto={'dark'}
        />
        </div>
      </div>
    </div>
    </>
  );
}

export default Dashboard;