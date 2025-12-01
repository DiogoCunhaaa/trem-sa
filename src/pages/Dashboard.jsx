import { useEffect, useState } from "react";
import SquarePart from '../components/SquarePart';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  const [trens, setTrens] = useState([]);
  const [sensores, setSensores] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [atividades, setAtividades] = useState([]);

  const API_URL = "http://localhost:3333";

  async function carregarDados() {
    try {
      let dadosTrens = [];
      try {
        const resTrens = await fetch(`${API_URL}/api/trains`);
        if (resTrens.ok) {
          const jsonTrens = await resTrens.json();
          dadosTrens = jsonTrens.trens || [];
          setTrens(dadosTrens);
        }
      } catch (err) {
        console.error("Erro ao carregar trens:", err);
      }

      let dadosSensores = [];
      try {
        const resSensores = await fetch(`${API_URL}/api/sensors`);
        if (resSensores.ok) {
          const jsonSensores = await resSensores.json();
          dadosSensores = Array.isArray(jsonSensores) ? jsonSensores : [];
          setSensores(dadosSensores);
        }
      } catch (err) {
        console.error("Erro ao carregar sensores:", err);
      }

      let dadosPedidos = [];
      try {
        const resPedidos = await fetch(`${API_URL}/api/maintenance`);
        if (resPedidos.ok) {
          const jsonPedidos = await resPedidos.json();
          dadosPedidos = Array.isArray(jsonPedidos) ? jsonPedidos : [];
          setPedidos(dadosPedidos);
        }
      } catch (err) {
        console.error("Erro ao carregar pedidos:", err);
      }

      gerarAtividades(dadosTrens, dadosSensores, dadosPedidos);

    } catch (err) {
      console.error("Erro geral ao carregar dados:", err);
    }
  }

  function gerarAtividades(trens, sensores, pedidos) {
    const todasAtividades = [];
    const agora = new Date();

    const trensArray = Array.isArray(trens) ? trens : [];
    const sensoresArray = Array.isArray(sensores) ? sensores : [];
    const pedidosArray = Array.isArray(pedidos) ? pedidos : [];

    trensArray.forEach((trem, index) => {
      todasAtividades.push({
        id: `trem-${trem.id_trem}`,
        tipo: 'trem',
        descricao: `Trem ${trem.nome_trem || trem.id_trem} cadastrado`,
        data: trem.data_criacao ? new Date(trem.data_criacao) : new Date(agora - index * 1000 * 60),
        detalhes: `Modelo: ${trem.modelo_trem || 'N/A'}`
      });
    });

    sensoresArray.forEach((sensor, index) => {
      todasAtividades.push({
        id: `sensor-${sensor.id_sensor}`,
        tipo: 'sensor',
        descricao: `Sensor tipo ${sensor.tipo_sensor || sensor.id_sensor} cadastrado`,
        data: sensor.data_instalacao ? new Date(sensor.data_instalacao) : new Date(agora - index * 1000 * 60),
        detalhes: `Valor: ${sensor.valor_sensor || 'N/A'}`
      });
    });

    pedidosArray.forEach((pedido, index) => {
      todasAtividades.push({
        id: `manutencao-${pedido.id_manutencao || pedido.id}`,
        tipo: 'manutenção',
        descricao: `Manutenção ${pedido.status || 'solicitada'} - ${pedido.descricao || 'Sem descrição'}`,
        data: pedido.data_solicitacao ? new Date(pedido.data_solicitacao) : new Date(agora - index * 1000 * 60),
        detalhes: `Prioridade: ${pedido.prioridade || 'Normal'}`
      });
    });

    todasAtividades.sort((a, b) => b.data - a.data);
    setAtividades(todasAtividades.slice(0, 10));
  }

  function formatarData(data) {
    const agora = new Date();
    const diff = Math.floor((agora - data) / 1000);

    if (diff < 60) return 'Agora mesmo';
    if (diff < 3600) return `${Math.floor(diff / 60)} min atrás`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h atrás`;
    if (diff < 172800) return 'Ontem';
    
    return data.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  }

  function getIconeTipo(tipo) {
    switch(tipo) {
      case 'manutenção': return '🔧';
      case 'sensor': return '📡';
      case 'trem': return '🚂';
      default: return '📋';
    }
  }

  function getCorTipo(tipo) {
    switch(tipo) {
      case 'manutenção': return 'warning';
      case 'sensor': return 'info';
      case 'trem': return 'success';
      default: return 'secondary';
    }
  }

  useEffect(() => {
    carregarDados();
    
    const handleStorageChange = (e) => {
      if (e.key === 'lastActivity') {
        carregarDados();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    const interval = setInterval(() => {
      const lastActivity = localStorage.getItem('lastActivity');
      if (lastActivity) {
        const activity = JSON.parse(lastActivity);
        const timeDiff = new Date() - new Date(activity.timestamp);
        
        if (timeDiff < 3000) {
          carregarDados();
        }
      }
    }, 2000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return (
   <>
   <div className="row m-3 g-4">
      <div className="col-4">
        <SquarePart className="dashboard-card">
          <h4>Trens</h4>
          <p className="fs-3">{trens.length || "0"}</p>
          <button className="btn btn-light mt-2" onClick={() => navigate('/trens')}>
            Gerenciar Trens
          </button>
        </SquarePart>
      </div>

      <div className="col-4">
        <SquarePart backgroundColor="black" corTexto="white" className="dashboard-card">
          <h4>Sensores</h4>
          <p className="fs-3">{sensores.length || "0"}</p>
          <button className="btn btn-dark mt-2" onClick={() => navigate('/sensores')}>
            Gerenciar Sensores
          </button>
        </SquarePart>
      </div>

      <div className="col-4">
        <SquarePart backgroundColor="#d9d9d9" className="dashboard-card">
          <h4>Pedidos de Manutenção</h4>
          <p className="fs-3">{pedidos.length || "0"}</p>
          <button className="btn btn-dark mt-2" onClick={() => navigate('/manutencao')}>
            Gerenciar Pedidos
          </button>
        </SquarePart>
      </div>
   </div>

   <div className="row m-3">
      <div className="col-12">
        <div className="card shadow-sm">
          <div className="card-header bg-white d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Atividades Recentes</h5>
            <small className="text-muted">Últimas 10 atividades</small>
          </div>
          <div className="card-body p-0">
            {atividades.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th style={{width: '60px'}} className="text-center">Tipo</th>
                      <th>Descrição</th>
                      <th style={{width: '200px'}}>Detalhes</th>
                      <th style={{width: '150px'}} className="text-end">Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {atividades.map((atividade) => (
                      <tr key={atividade.id}>
                        <td className="text-center fs-5">{getIconeTipo(atividade.tipo)}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <span className={`badge bg-${getCorTipo(atividade.tipo)} me-2`}>
                              {atividade.tipo}
                            </span>
                            {atividade.descricao}
                          </div>
                        </td>
                        <td className="text-muted small">{atividade.detalhes}</td>
                        <td className="text-end text-muted">{formatarData(atividade.data)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-5 text-center text-muted">
                <div className="mb-3 fs-1">📊</div>
                <p className="mb-0">Nenhuma atividade registrada ainda</p>
                <small>Comece cadastrando trens, sensores ou pedidos de manutenção</small>
              </div>
            )}
          </div>
        </div>
      </div>
   </div>
   </>
  );
}

export default Dashboard;