import SquarePart from '../components/SquarePart';

function Dashboard() {
  return (
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
            percentageLeft="42% completo"
            distanceLeft="2400 L"
            backgroundColor="black"
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;