import RectanglePart from '../components/RectanglePart';
import ButtonTrens from '../javascript/ButtonManutencao';
import ButtonInfo from '../components/infos/ButtonInfo';
import styles from '../components/cadastro/InputField.module.css';
import TrensInfo from '../components/infos/TrensInfo';

function Trens() {
  return (
    <div class='container'>
      <div className='row mt-3'>
        <div className='col'>
          <RectanglePart>
            <TrensInfo
              icon={'done'}
              trem={{nome: "ES43", modelo: "2", condutor: "joao", id: 1 }}
            />
          </RectanglePart>
        </div>
      </div>

      <div className='row mt-3'>
        <div className='col'>
          <button className={`${styles.customButton}`}>Adicionar Trens</button>
        </div>
      </div>
    </div>
  );
}

export default Trens;
