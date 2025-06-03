import RectanglePart from "../components/RectanglePart";
import SmallInfo from "../components/infos/SmallInfo";

function Relatorios() {

  return (
    <div className="container">

      <div className="row mt-3">

        <div className="col-6">
        <RectanglePart>
          <SmallInfo />
        </RectanglePart>
        </div>

        <div className="col-6">
        <RectanglePart>
          <SmallInfo />
        </RectanglePart>
        </div>


      
      </div>

      
    </div>
  );
}

export default Relatorios;
