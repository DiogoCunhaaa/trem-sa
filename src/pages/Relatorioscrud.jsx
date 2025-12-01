import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:3333';

function getUserId() {
  try {
    const raw = sessionStorage.getItem('user');
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.id ?? null;
  } catch (e) {
    return null;
  }
}

async function fetchJSON(url, opts = {}) {
  const res = await fetch(url, {
    ...opts,
    headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) },
    credentials: 'include'
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${text}`);
  return JSON.parse(text);
}

export default function RelatoriosCRUD() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingList, setLoadingList] = useState(true);
  const [tipoRelatorio, setTipoRelatorio] = useState('sensores');
  const [filtros, setFiltros] = useState({
    dataInicio: '',
    dataFim: '',
    tremId: '',
    rotaId: '',
    sensorId: ''
  });
  const [trens, setTrens] = useState([]);
  const [relatoriosGerados, setRelatoriosGerados] = useState([]);
  const [error, setError] = useState('');
  const [visualizarRelatorio, setVisualizarRelatorio] = useState(null);

  const userId = getUserId();

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    try {
      setLoadingList(true);
      const [dadosTrens, dadosRelatorios] = await Promise.all([
        fetchJSON(`${API_URL}/api/trains`),
        fetchJSON(`${API_URL}/api/reports`)
      ]);
      
      setTrens(dadosTrens?.trens || []);
      setRelatoriosGerados(dadosRelatorios || []);
    } catch (e) {
      console.error('Erro ao carregar dados:', e);
      setError('Falha ao carregar dados iniciais');
    } finally {
      setLoadingList(false);
    }
  }

  function atualizarFiltro(campo, valor) {
    setFiltros(prev => ({ ...prev, [campo]: valor }));
  }

  async function gerarRelatorio(e) {
    e.preventDefault();
    
    if (!filtros.dataInicio || !filtros.dataFim) {
      alert('Por favor, selecione o período do relatório!');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const payload = {
        tipo: tipoRelatorio,
        filtros: filtros,
        id_usuario: userId
      };

      const resultado = await fetchJSON(`${API_URL}/api/reports/generate`, {
        method: 'POST',
        body: JSON.stringify(payload)
      });

      alert('Relatório gerado com sucesso!');
      await carregarDados();
      
      // Limpar formulário
      setFiltros({
        dataInicio: '',
        dataFim: '',
        tremId: '',
        rotaId: '',
        sensorId: ''
      });
      
    } catch (e) {
      console.error('Erro ao gerar relatório:', e);
      setError('Falha ao gerar relatório: ' + e.message);
      alert('Falha ao gerar relatório.');
    } finally {
      setLoading(false);
    }
  }

  async function visualizarDetalhes(id) {
    try {
      const relatorio = await fetchJSON(`${API_URL}/api/reports/${id}`);
      
      // Parse da mensagem JSON
      let dadosFormatados = {};
      try {
        dadosFormatados = JSON.parse(relatorio.mensagem_relatorio);
      } catch {
        dadosFormatados = { raw: relatorio.mensagem_relatorio };
      }
      
      setVisualizarRelatorio({
        ...relatorio,
        dadosParsed: dadosFormatados
      });
    } catch (e) {
      alert('Erro ao carregar detalhes do relatório');
    }
  }

  function baixarRelatorio(relatorio) {
    try {
      const dados = JSON.parse(relatorio.mensagem_relatorio);
      const blob = new Blob([JSON.stringify(dados, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${relatorio.nome_relatorio}.json`;
      a.click();
      URL.revokeObjectURL(url);
      alert('Relatório baixado com sucesso!');
    } catch (e) {
      alert('Erro ao baixar relatório');
    }
  }

  async function excluirRelatorio(id) {
    if (!window.confirm('Deseja realmente excluir este relatório?')) return;
    
    try {
      await fetchJSON(`${API_URL}/api/reports/delete/${id}`, { method: 'DELETE' });
      setRelatoriosGerados(prev => prev.filter(r => r.id_relatorio !== id));
      alert('Relatório excluído com sucesso!');
    } catch (e) {
      alert('Erro ao excluir relatório');
    }
  }

  if (!userId) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning">
          <h4>Autenticação necessária</h4>
          <p>Você precisa estar logado para gerar relatórios.</p>
          <button className="btn btn-primary" onClick={() => navigate('/loginpage')}>
            Ir para Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h2>
          <i className="bi bi-file-earmark-text"></i> Geração de Relatórios
        </h2>
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          <i className="bi bi-arrow-left"></i> Voltar
        </button>
      </div>

      {error && (
        <div className="alert alert-danger alert-dismissible">
          {error}
          <button type="button" className="btn-close" onClick={() => setError('')}></button>
        </div>
      )}

      {/* Formulário de Geração */}
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Novo Relatório</h5>
        </div>
        <div className="card-body">
          <div>
            {/* Tipo de Relatório */}
            <div className="mb-4">
              <label className="form-label fw-bold">Tipo de Relatório *</label>
              <div className="row">
                <div className="col-md-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="tipoRelatorio"
                      id="tipoSensores"
                      value="sensores"
                      checked={tipoRelatorio === 'sensores'}
                      onChange={(e) => setTipoRelatorio(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="tipoSensores">
                      <i className="bi bi-speedometer2"></i> Dados de Sensores
                    </label>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="tipoRelatorio"
                      id="tipoRotas"
                      value="rotas"
                      checked={tipoRelatorio === 'rotas'}
                      onChange={(e) => setTipoRelatorio(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="tipoRotas">
                      <i className="bi bi-map"></i> Rotas Percorridas
                    </label>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="tipoRelatorio"
                      id="tipoManutencao"
                      value="manutencao"
                      checked={tipoRelatorio === 'manutencao'}
                      onChange={(e) => setTipoRelatorio(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="tipoManutencao">
                      <i className="bi bi-tools"></i> Manutenções
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Período */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Data Início *</label>
                <input
                  type="date"
                  className="form-control"
                  value={filtros.dataInicio}
                  onChange={(e) => atualizarFiltro('dataInicio', e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Data Fim *</label>
                <input
                  type="date"
                  className="form-control"
                  value={filtros.dataFim}
                  onChange={(e) => atualizarFiltro('dataFim', e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Filtros Específicos */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Filtrar por Trem (opcional)</label>
                <select
                  className="form-select"
                  value={filtros.tremId}
                  onChange={(e) => atualizarFiltro('tremId', e.target.value)}
                >
                  <option value="">Todos os trens</option>
                  {trens.map(t => (
                    <option key={t.id_trem} value={t.id_trem}>
                      {t.nome_trem || t.modelo_trem} - ID: {t.id_trem}
                    </option>
                  ))}
                </select>
              </div>

              {tipoRelatorio === 'rotas' && (
                <div className="col-md-6">
                  <label className="form-label">Filtrar por Rota (opcional)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="ID da rota"
                    value={filtros.rotaId}
                    onChange={(e) => atualizarFiltro('rotaId', e.target.value)}
                  />
                </div>
              )}

              {tipoRelatorio === 'sensores' && (
                <div className="col-md-6">
                  <label className="form-label">Filtrar por Sensor (opcional)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="ID do sensor"
                    value={filtros.sensorId}
                    onChange={(e) => atualizarFiltro('sensorId', e.target.value)}
                  />
                </div>
              )}
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setFiltros({
                  dataInicio: '',
                  dataFim: '',
                  tremId: '',
                  rotaId: '',
                  sensorId: ''
                })}
              >
                Limpar Filtros
              </button>
              <button type="button" onClick={gerarRelatorio} className="btn btn-primary" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Gerando...
                  </>
                ) : (
                  <>
                    <i className="bi bi-file-earmark-plus"></i> Gerar Relatório
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Relatórios Gerados */}
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Relatórios Gerados ({relatoriosGerados.length})</h5>
        </div>
        <div className="card-body p-0">
          {loadingList ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary"></div>
              <p className="mt-2">Carregando relatórios...</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Tipo</th>
                    <th>Usuário</th>
                    <th style={{ width: '200px' }}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {relatoriosGerados.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-4">
                        <i className="bi bi-inbox" style={{ fontSize: '3rem', color: '#ccc' }}></i>
                        <p className="mt-2 text-muted">Nenhum relatório gerado ainda.</p>
                      </td>
                    </tr>
                  ) : (
                    relatoriosGerados.map(rel => (
                      <tr key={rel.id_relatorio}>
                        <td className="align-middle">
                          <span className="badge bg-secondary">{rel.id_relatorio}</span>
                        </td>
                        <td className="align-middle">{rel.nome_relatorio}</td>
                        <td className="align-middle">
                          <span className="badge bg-info">
                            {rel.tipo_relatorio === 'sensores' && <i className="bi bi-speedometer2 me-1"></i>}
                            {rel.tipo_relatorio === 'rotas' && <i className="bi bi-map me-1"></i>}
                            {rel.tipo_relatorio === 'manutencao' && <i className="bi bi-tools me-1"></i>}
                            {rel.tipo_relatorio}
                          </span>
                        </td>
                        <td className="align-middle">{rel.nome_usuario || 'N/A'}</td>
                        <td className="align-middle">
                          <div className="d-flex gap-2">
                            <button
                              className="btn btn-sm btn-primary"
                              onClick={() => baixarRelatorio(rel)}
                              title="Baixar relatório"
                            >
                              <i className="bi bi-download"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-info"
                              onClick={() => visualizarDetalhes(rel.id_relatorio)}
                              title="Visualizar"
                            >
                              <i className="bi bi-eye"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => excluirRelatorio(rel.id_relatorio)}
                              title="Excluir"
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Visualização */}
      {visualizarRelatorio && (
        <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{visualizarRelatorio.nome_relatorio}</h5>
                <button type="button" className="btn-close" onClick={() => setVisualizarRelatorio(null)}></button>
              </div>
              <div className="modal-body">
                <pre className="bg-light p-3" style={{maxHeight: '500px', overflow: 'auto'}}>
                  {JSON.stringify(visualizarRelatorio.dadosParsed, null, 2)}
                </pre>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setVisualizarRelatorio(null)}>
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}