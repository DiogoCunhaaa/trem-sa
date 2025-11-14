import { useState } from 'react';
import RectanglePart from '../components/RectanglePart';
import styles from '../components/cadastro/InputField.module.css';
import TrensInfo from '../components/infos/TrensInfo';

import CriarTrensModal from '../components/modals/CriarTrensModal'

function Trens() {
  const [showModalCriarTrens, setShowModalCriarTrens] = useState(false);

  return (
    <div className='container'>
      <div className='row mt-3'>
        <div className='col'>
          <RectanglePart>
            <TrensInfo
              icon={'done'}
              trem={{nome: "ES43", condutor: "joao", id: 1 }}
            />
          </RectanglePart>
        </div>
      </div>

      <div className='row mt-3'>
        <div className='col'>
          <button className={`${styles.customButton}`} onClick={() => setShowModalCriarTrens(true)}>Adicionar Trens</button>
        </div>
      </div>

      <CriarTrensModal
      show={showModalCriarTrens}
      onClose={() => setShowModalCriarTrens(false)}
      onConfirm={() => {
        console.log('Trem criado');
        setShowModalCriarTrens(false);
      }}
      />
    </div>
  );
}

export default Trens;
