import RectanglePart from '../components/RectanglePart';
import SensoresInfo from '../components/infos/SensoresInfo';
import PedidosInfo from '../components/infos/PedidosInfo';
import ButtonSensores from '../javascript/ButtonManutencao';
import ButtonInfo from '../components/infos/ButtonInfo';
import { useEffect, useState } from 'react';
import { DadosColetados } from '../javascript/DadosColetados';
import CriarSensorModal from '../components/modals/CriarSensorModal';
import ExcluirSensorModal from '../components/modals/ExcluirSensorModal';
import EditarSensorModal from '../components/modals/EditarSensorModal';

function Sensores() {
  const [showModalExcluirSensores, setShowModalExcluirSensores] =
    useState(false);
  const [showModalCriarSensores, setShowModalCriarSensores] = useState(false);
  const [showModalEditarSensores, setShowModalEditarSensors] = useState(false);
  const [sensores, setSensores] = useState([]);

  async function carregarSensores() {
    try {
      const API_URL = 'http://localhost:3333';

      const res = await fetch(`${API_URL}/api/sensors/`);
      const dados = await res.json();

      if (res.ok) {
        setSensores(dados);
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao conectar com o servidor.');
    }
  }

  useEffect(() => {
    carregarSensores();
  }, []);

  console.log(sensores);

  return (
    <div className='container'>
      <div className='row mt-3'>
        <div className='col-6'>
          <RectanglePart backgroundColor={'black'}>
            <ButtonInfo
              title={'Adicione seu sensor'}
              textColor={'white'}
              buttonTitle={'Adicionar sensor'}
              backgroundColor={'#b8b8b8'}
              onClick={() => setShowModalCriarSensores(true)}
            />
          </RectanglePart>
        </div>
        <div className='col-6'>
          <RectanglePart backgroundColor={'black'}>
            <ButtonInfo
              title={'Remova seu sensor'}
              textColor={'white'}
              buttonTitle={'Remover sensor'}
              backgroundColor={'#b8b8b8'}
              onClick={() => setShowModalExcluirSensores(true)}
            />
          </RectanglePart>
        </div>
      </div>
      <div className='row mt-3'>
        <div className='col-12'>
          <RectanglePart backgroundColor={''}>
            <ButtonInfo
              title={'Editar seu sensor'}
              textColor={'black'}
              buttonTitle={'Editar sensor'}
              backgroundColor={'#b8b8b8'}
              onClick={() => setShowModalEditarSensors(true)}
            />
          </RectanglePart>
        </div>
      </div>

      <div className='row mt-3'>
        {sensores.map((sensor) => (
          <div key={sensor.id_sensor} className='col-6 mb-3'>
            <RectanglePart>
              <SensoresInfo icon={'done'} item={sensor} />
            </RectanglePart>
          </div>
        ))}
      </div>

      <CriarSensorModal
        show={showModalCriarSensores}
        onClose={() => {
          setShowModalCriarSensores(false);
        }}
        onConfirm={() => {
          setShowModalCriarSensores(false);
          carregarSensores();
        }}
      />

      <EditarSensorModal
        show={showModalEditarSensores}
        onClose={() => {
          setShowModalEditarSensors(false);
        }}
        onConfirm={() => {
          setShowModalEditarSensors(false);
          carregarSensores();
        }}
      />

      <ExcluirSensorModal
        // sensor_id={}
        show={showModalExcluirSensores}
        onClose={() => {
          setShowModalExcluirSensores(false);
        }}
        onConfirm={() => {
          setShowModalExcluirSensores(false);
          carregarSensores();
        }}
      />
    </div>
  );
}

export default Sensores;
