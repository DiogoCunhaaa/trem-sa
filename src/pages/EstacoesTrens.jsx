import { useEffect, useState } from 'react';
import RectanglePart from '../components/RectanglePart';
import styles from '../components/cadastro/InputField.module.css';
import TrensInfo from '../components/infos/TrensInfo';

import CriarEstacaoModal from '../components/modals/CriarEstacaoModal';
import EstacaoInfo from '../components/infos/EstacoesInfo';

function Trens() {
  const [showModalCriarEstacao, setShowModalCriarEstacao] = useState(false);
  const [estacoes, setEstacoes] = useState([]);

  async function carregarEstacoes() {
    try {
      const API_URL = 'http://localhost:3333';

      const res = await fetch(`${API_URL}/api/stations/`);
      const dados = await res.json();

      if (res.ok) {
        setEstacoes(dados.estacoes || []);
      }

      return dados;
    } catch (err) {
      console.error(err);
      alert('Erro ao conectar com o servidor.');
    }
  }

  useEffect(() => {
    carregarEstacoes();
  }, []);

  console.log(estacoes);

  return (
    <div className='container'>
      {/*Renderiza cada trem*/}
      {estacoes.map((estacao) => (
        <div key={estacao.id_estacao} className='row mt-3'>
          <div className='col'>
            <RectanglePart>
              <EstacaoInfo
                icon={'train'}
                estacao={estacao}
                onUpdate={carregarEstacoes}
              />
            </RectanglePart>
          </div>
        </div>
      ))}

      <div className='row mt-3'>
        <div className='col'>
          <button
            className={`${styles.customButton}`}
            onClick={() => setShowModalCriarEstacao(true)}
          >
            Adicionar Estacao
          </button>
        </div>
      </div>

      <CriarEstacaoModal
        show={showModalCriarEstacao}
        onClose={() => setShowModalCriarEstacao(false)}
        onConfirm={() => {
          setShowModalCriarEstacao(false);
          carregarEstacoes();
        }}
      />
    </div>
  );
}

export default Trens;
