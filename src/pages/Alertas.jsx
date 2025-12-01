import { useState, useEffect } from 'react';
import RectanglePart from '../components/RectanglePartAlerta';
import ListaAlertas from '../components/ListaAlertas';
import FormularioAlerta from '../components/FormularioAlerta';
import ModalConfirmacao from '../components/ModalConfirmacao';

function GerenciamentoAlertas() {
  const [alertas, setAlertas] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [alertaSelecionado, setAlertaSelecionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [alertaParaExcluir, setAlertaParaExcluir] = useState(null);

  // Carregar alertas do localStorage ao iniciar
  useEffect(() => {
    const alertasSalvos = localStorage.getItem('alertas');
    if (alertasSalvos) {
      setAlertas(JSON.parse(alertasSalvos));
    } else {
      // Alertas padrão
      setAlertas([
        {
          id: '1',
          nome: 'Freio desgastado',
          descricao: 'Alerta quando o desgaste do freio ultrapassar o limite',
          sensor: 'freio',
          condicao: 'maior',
          valor: 70,
          ativo: true,
          prioridade: 'alta'
        },
        {
          id: '2',
          nome: 'Nível de combustível baixo',
          descricao: 'Alerta quando o combustível estiver abaixo de 30%',
          sensor: 'combustivel',
          condicao: 'menor',
          valor: 30,
          ativo: true,
          prioridade: 'media'
        },
        {
          id: '3',
          nome: 'Temperatura do motor',
          descricao: 'Alerta quando a temperatura exceder 90°C',
          sensor: 'temperatura',
          condicao: 'maior',
          valor: 90,
          ativo: true,
          prioridade: 'alta'
        }
      ]);
    }
  }, []);

  // Salvar alertas no localStorage quando houver mudanças
  useEffect(() => {
    if (alertas.length > 0) {
      localStorage.setItem('alertas', JSON.stringify(alertas));
    }
  }, [alertas]);

  const handleNovoAlerta = () => {
    setModoEdicao(true);
    setAlertaSelecionado(null);
  };

  const handleEditarAlerta = (alerta) => {
    setModoEdicao(true);
    setAlertaSelecionado(alerta);
  };

  const handleSalvarAlerta = (alertaData) => {
    if (alertaSelecionado) {
      // Editar alerta existente
      setAlertas(alertas.map(a => 
        a.id === alertaSelecionado.id ? { ...alertaData, id: alertaSelecionado.id } : a
      ));
    } else {
      // Criar novo alerta
      const novoAlerta = {
        ...alertaData,
        id: Date.now().toString()
      };
      setAlertas([...alertas, novoAlerta]);
    }
    setModoEdicao(false);
    setAlertaSelecionado(null);
  };

  const handleCancelar = () => {
    setModoEdicao(false);
    setAlertaSelecionado(null);
  };

  const handleExcluirClick = (alerta) => {
    setAlertaParaExcluir(alerta);
    setMostrarModal(true);
  };

  const handleConfirmarExclusao = () => {
    setAlertas(alertas.filter(a => a.id !== alertaParaExcluir.id));
    setMostrarModal(false);
    setAlertaParaExcluir(null);
  };

  const handleToggleAtivo = (id) => {
    setAlertas(alertas.map(a => 
      a.id === id ? { ...a, ativo: !a.ativo } : a
    ));
  };

  return (
    <div className='container'>
      <div className='row mt-4'>
        <div className='col-12'>
          <div className='d-flex justify-content-between align-items-center mb-3'>
            <h2>Gerenciamento de Alertas</h2>
            {!modoEdicao && (
              <button 
                className='btn btn-primary'
                onClick={handleNovoAlerta}
              >
                <i className='bi bi-plus-circle me-2'></i>
                Novo Alerta
              </button>
            )}
          </div>
        </div>
      </div>

      {modoEdicao ? (
        <div className='row'>
          <div className='col-12'>
            <RectanglePart>
              <FormularioAlerta
                alerta={alertaSelecionado}
                onSalvar={handleSalvarAlerta}
                onCancelar={handleCancelar}
              />
            </RectanglePart>
          </div>
        </div>
      ) : (
        <div className='row'>
          <div className='col-12'>
            <RectanglePart>
              <ListaAlertas
                alertas={alertas}
                onEditar={handleEditarAlerta}
                onExcluir={handleExcluirClick}
                onToggleAtivo={handleToggleAtivo}
              />
            </RectanglePart>
          </div>
        </div>
      )}

      <ModalConfirmacao
        mostrar={mostrarModal}
        titulo="Confirmar Exclusão"
        mensagem={`Tem certeza que deseja excluir o alerta "${alertaParaExcluir?.nome}"?`}
        onConfirmar={handleConfirmarExclusao}
        onCancelar={() => setMostrarModal(false)}
      />
    </div>
  );
}

export default GerenciamentoAlertas;