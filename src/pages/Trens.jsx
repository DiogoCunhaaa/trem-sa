import { useEffect, useState } from 'react';
import RectanglePart from '../components/RectanglePart';
import styles from '../components/cadastro/InputField.module.css';
import TrensInfo from '../components/infos/TrensInfo';

import CriarTrensModal from '../components/modals/CriarTrensModal';

function Trens() {
  const [showModalCriarTrens, setShowModalCriarTrens] = useState(false);
  const [trens, setTrens] = useState([]);

  async function carregarTrens() {
    try {
      const API_URL = 'http://localhost:3333';

      const res = await fetch(`${API_URL}/api/trains/`);
      const dados = await res.json();

      if (res.ok) {
        setTrens(dados.trens || []);
      }

      return dados;
    } catch (err) {
      console.error(err);
      alert('Erro ao conectar com o servidor.');
    }
  }

  useEffect(() => {
    carregarTrens();
  }, []);

  console.log(trens);

  return (
    <div className='container'>
      {/*Renderiza cada trem*/}
      {trens.map((trem) => (
        <div key={trem.id_trem} className='row mt-3'>
          <div className='col'>
            <RectanglePart>
              <TrensInfo icon={'train'} trem={trem} onUpdate={carregarTrens}/>
            </RectanglePart>
          </div>
        </div>
      ))}

      <div className='row mt-3'>
        <div className='col'>
          <button
            className={`${styles.customButton}`}
            onClick={() => setShowModalCriarTrens(true)}
          >
            Adicionar Trens
          </button>
        </div>
      </div>

      <CriarTrensModal
        show={showModalCriarTrens}
        onClose={() => setShowModalCriarTrens(false)}
        onConfirm={() => {
          setShowModalCriarTrens(false);
          carregarTrens();
        }}
      />
    </div>
  );
}

export default Trens;
