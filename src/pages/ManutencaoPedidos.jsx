import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:3333';

function getUserId() {
  try {
    const raw = sessionStorage.getItem('user');
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.id ?? null;
  } catch (e) {
    console.error('Falha ao ler sessionStorage.user', e);
    return null;
  }
}

async function fetchJSON(url, opts = {}) {
  const res = await fetch(url, {
    ...opts,
    headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) },
    credentials: 'include',
  });

  const text = await res.text();

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${text.substring(0, 100)}`);
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    throw new Error(`Invalid JSON response from ${url}`);
  }
}

function parseMensagem(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export default function ManutencaoPedidos() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pedidos, setPedidos] = useState([]);
  const [trens, setTrens] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState({
    nome: '',
    data: '',
    horario: '',
    tremId: '',
    tremNome: '',
  });

  const userId = useMemo(() => getUserId(), []);

  async function carregar() {
    setLoading(true);
    setError('');
    try {
      const [dadosPedidos, dadosTrens] = await Promise.all([
        fetchJSON(`${API_URL}/api/maintenance`),
        fetchJSON(`${API_URL}/api/trains`),
      ]);

      const pedidosArray = Array.isArray(dadosPedidos) ? dadosPedidos : [];
      const trensArray = dadosTrens?.trens || [];

      setPedidos(pedidosArray);
      setTrens(trensArray);
    } catch (e) {
      console.error('Erro ao carregar:', e);
      setError(`Erro ao carregar dados: ${e.message}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  function tremPorId(id) {
    return trens.find((t) => t.id_trem === id) || null;
  }

  function dadosPedido(p) {
    const msg = parseMensagem(p.mensagem_manutencao);
    const trem = tremPorId(p.id_trem);

    const tremNome =
      trem?.nome_trem || trem?.modelo_trem || msg.trem_nome || '-';
    const tremNum =
      trem?.numero_trem || trem?.modelo_trem || msg.trem_numero || '-';

    return {
      id: p.id_manutencao,
      nome: p.nome_manutencao,
      data: msg.data_pedido || msg.data || '-',
      horario: msg.horario_pedido || '-',
      tremNome,
      tremNum,
      tipo: p.tipo_manutencao,
      id_trem: p.id_trem,
    };
  }

  async function remover(id) {
    if (!window.confirm('Deseja realmente remover este pedido?')) return;

    try {
      await fetchJSON(`${API_URL}/api/maintenance/delete/${id}`, {
        method: 'DELETE',
      });
      setPedidos((prev) => prev.filter((p) => p.id_manutencao !== id));
      alert('Pedido removido com sucesso!');
    } catch (e) {
      alert('Falha ao remover pedido.');
    }
  }

  function buildMensagem({ data, horario, tremNome, tremNum }) {
    return JSON.stringify({
      data_pedido: data || null,
      horario_pedido: horario || null,
      trem_nome: tremNome || null,
      trem_numero: tremNum || null,
    });
  }

  function iniciarEdicao(p) {
    setEditingId(p.id);
    setEditForm({
      id: p.id,
      nome: p.nome,
      data: p.data !== '-' ? p.data : '',
      horario: p.horario !== '-' ? p.horario : '',
      tremNome: p.tremNome !== '-' ? p.tremNome : '',
      tremNum: p.tremNum !== '-' ? p.tremNum : '',
      tipo: p.tipo,
      id_trem: p.id_trem,
    });
  }

  function cancelarEdicao() {
    setEditingId(null);
    setEditForm({});
  }

  function atualizarCampo(campo, valor) {
    setEditForm((prev) => ({ ...prev, [campo]: valor }));
  }

  async function salvarEdicao() {
    if (!editForm.nome.trim()) {
      alert('O nome do pedido é obrigatório!');
      return;
    }

    const body = {
      nome_manutencao: editForm.nome,
      mensagem_manutencao: buildMensagem({
        data: editForm.data,
        horario: editForm.horario,
        tremNome: editForm.tremNome,
        tremNum: editForm.tremNum,
      }),
      tipo_manutencao: editForm.tipo || 'pedido',
      id_trem: editForm.id_trem || null,
      id_usuario: userId,
    };

    try {
      await fetchJSON(`${API_URL}/api/maintenance/update/${editForm.id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
      });
      cancelarEdicao();
      await carregar();
      alert('Pedido atualizado com sucesso!');
    } catch (e) {
      alert('Falha ao salvar edição.');
    }
  }

  function atualizarCampoAdd(campo, valor) {
    setAddForm((prev) => ({ ...prev, [campo]: valor }));
  }

  function limparFormAdd() {
    setAddForm({
      nome: '',
      data: '',
      horario: '',
      tremId: '',
      tremNome: '',
    });
  }

  async function adicionarPedido(e) {
    e.preventDefault();

    if (!addForm.nome.trim()) {
      alert('O nome do pedido é obrigatório!');
      return;
    }

    const tremSelecionado = trens.find(
      (t) => t.id_trem === Number(addForm.tremId)
    );
    const tremNome =
      tremSelecionado?.nome_trem ||
      tremSelecionado?.modelo_trem ||
      addForm.tremNome ||
      null;

    const body = {
      nome_manutencao: addForm.nome,
      mensagem_manutencao: buildMensagem({
        data: addForm.data,
        horario: addForm.horario,
        tremNome: tremNome,
        tremNum: tremSelecionado?.modelo_trem || null,
      }),
      tipo_manutencao: 'pedido',
      id_trem: addForm.tremId ? Number(addForm.tremId) : null,
      id_usuario: userId,
    };

    try {
      await fetchJSON(`${API_URL}/api/maintenance/create`, {
        method: 'POST',
        body: JSON.stringify(body),
      });
      limparFormAdd();
      setShowAddForm(false);
      await carregar();
      alert('Pedido criado com sucesso!');
    } catch (e) {
      console.error(e);
      alert('Falha ao criar pedido.');
    }
  }

  if (!userId) {
    return (
      <div className='container mt-4'>
        <div className='alert alert-warning'>
          <h4>Autenticação necessária</h4>
          <p>Você precisa estar logado para gerenciar os pedidos.</p>
          <button
            className='btn btn-primary mt-2'
            onClick={() => navigate('/loginpage')}
          >
            Ir para Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='container mt-4'>
      <div className='d-flex align-items-center justify-content-between mb-4'>
        <h2>Gerenciar Pedidos de Manutenção</h2>
        <div>
          <button
            className='btn btn-secondary me-2'
            onClick={() => navigate('/manutencaocrud')}
          >
            <i className='bi bi-arrow-left'></i> Voltar
          </button>
          <button
            className='btn btn-outline-primary me-2'
            onClick={carregar}
            disabled={loading}
          >
            <i className='bi bi-arrow-clockwise'></i> Atualizar
          </button>
          <button
            className='btn btn-success'
            onClick={() => setShowAddForm(!showAddForm)}
          >
            <i className='bi bi-plus-circle'></i> Novo Pedido
          </button>
        </div>
      </div>

      {error && (
        <div
          className='alert alert-danger alert-dismissible fade show'
          role='alert'
        >
          <strong>Erro:</strong> {error}
          <button
            type='button'
            className='btn-close'
            onClick={() => setError('')}
          ></button>
        </div>
      )}

      {/* Formulário de Adicionar */}
      {showAddForm && (
        <div className='card mb-4'>
          <div className='card-header bg-success text-white'>
            <h5 className='mb-0'>Novo Pedido de Manutenção</h5>
          </div>
          <div className='card-body'>
            <form onSubmit={adicionarPedido}>
              <div className='row'>
                <div className='col-md-6 mb-3'>
                  <label className='form-label'>Nome do Pedido *</label>
                  <input
                    type='text'
                    className='form-control'
                    value={addForm.nome}
                    onChange={(e) => atualizarCampoAdd('nome', e.target.value)}
                    placeholder='Ex: Revisão preventiva'
                    required
                  />
                </div>
                <div className='col-md-3 mb-3'>
                  <label className='form-label'>Data</label>
                  <input
                    type='date'
                    className='form-control'
                    value={addForm.data}
                    onChange={(e) => atualizarCampoAdd('data', e.target.value)}
                  />
                </div>
                <div className='col-md-3 mb-3'>
                  <label className='form-label'>Horário</label>
                  <input
                    type='time'
                    className='form-control'
                    value={addForm.horario}
                    onChange={(e) =>
                      atualizarCampoAdd('horario', e.target.value)
                    }
                  />
                </div>
              </div>
              <div className='row'>
                <div className='col-md-6 mb-3'>
                  <label className='form-label'>Trem</label>
                  <select
                    className='form-select'
                    value={addForm.tremId}
                    onChange={(e) =>
                      atualizarCampoAdd('tremId', e.target.value)
                    }
                  >
                    <option value=''>Selecione um trem (opcional)</option>
                    {trens.map((t) => (
                      <option key={t.id_trem} value={t.id_trem}>
                        {t.nome_trem || t.modelo_trem} - ID: {t.id_trem}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='col-md-6 mb-3'>
                  <label className='form-label'>Ou digite o nome do trem</label>
                  <input
                    type='text'
                    className='form-control'
                    value={addForm.tremNome}
                    onChange={(e) =>
                      atualizarCampoAdd('tremNome', e.target.value)
                    }
                    placeholder='Nome manual do trem'
                    disabled={!!addForm.tremId}
                  />
                </div>
              </div>
              <div className='d-flex justify-content-end gap-2'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={() => {
                    setShowAddForm(false);
                    limparFormAdd();
                  }}
                >
                  Cancelar
                </button>
                <button type='submit' className='btn btn-success'>
                  <i className='bi bi-check-circle'></i> Criar Pedido
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tabela de Pedidos */}
      {loading ? (
        <div className='text-center py-5'>
          <div className='spinner-border text-primary' role='status'>
            <span className='visually-hidden'>Carregando...</span>
          </div>
          <p className='mt-2'>Carregando pedidos...</p>
        </div>
      ) : (
        <div className='card'>
          <div className='card-header'>
            <h5 className='mb-0'>Lista de Pedidos ({pedidos.length})</h5>
          </div>
          <div className='card-body p-0'>
            <div className='table-responsive'>
              <table className='table table-hover table-striped mb-0'>
                <thead className='table-dark'>
                  <tr>
                    <th style={{ width: '60px' }}>ID</th>
                    <th>Nome</th>
                    <th>Data</th>
                    <th>Horário</th>
                    <th>Trem</th>
                    <th style={{ width: '200px' }}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidos.length === 0 ? (
                    <tr>
                      <td colSpan={6} className='text-center py-4'>
                        <i
                          className='bi bi-inbox'
                          style={{ fontSize: '3rem', color: '#ccc' }}
                        ></i>
                        <p className='mt-2 text-muted'>
                          Nenhum pedido encontrado.
                        </p>
                        <button
                          className='btn btn-primary btn-sm'
                          onClick={() => setShowAddForm(true)}
                        >
                          Criar primeiro pedido
                        </button>
                      </td>
                    </tr>
                  ) : (
                    pedidos.map((pRaw) => {
                      const p = dadosPedido(pRaw);
                      const isEditing = editingId === p.id;

                      return (
                        <tr key={p.id}>
                          <td className='align-middle'>
                            <span className='badge bg-secondary'>{p.id}</span>
                          </td>
                          <td className='align-middle'>
                            {isEditing ? (
                              <input
                                className='form-control form-control-sm'
                                value={editForm.nome || ''}
                                onChange={(e) =>
                                  atualizarCampo('nome', e.target.value)
                                }
                              />
                            ) : (
                              p.nome
                            )}
                          </td>
                          <td className='align-middle'>
                            {isEditing ? (
                              <input
                                className='form-control form-control-sm'
                                type='date'
                                value={editForm.data || ''}
                                onChange={(e) =>
                                  atualizarCampo('data', e.target.value)
                                }
                              />
                            ) : (
                              p.data
                            )}
                          </td>
                          <td className='align-middle'>
                            {isEditing ? (
                              <input
                                className='form-control form-control-sm'
                                type='time'
                                value={editForm.horario || ''}
                                onChange={(e) =>
                                  atualizarCampo('horario', e.target.value)
                                }
                              />
                            ) : (
                              p.horario
                            )}
                          </td>
                          <td className='align-middle'>
                            {isEditing ? (
                              <input
                                className='form-control form-control-sm'
                                value={editForm.tremNome || ''}
                                onChange={(e) =>
                                  atualizarCampo('tremNome', e.target.value)
                                }
                              />
                            ) : (
                              <span className='badge bg-info'>
                                {p.tremNome}
                              </span>
                            )}
                          </td>
                          <td className='align-middle'>
                            {isEditing ? (
                              <div className='d-flex gap-2'>
                                <button
                                  className='btn btn-sm btn-success'
                                  onClick={salvarEdicao}
                                >
                                  <i className='bi bi-check'></i> Salvar
                                </button>
                                <button
                                  className='btn btn-sm btn-secondary'
                                  onClick={cancelarEdicao}
                                >
                                  <i className='bi bi-x'></i> Cancelar
                                </button>
                              </div>
                            ) : (
                              <div className='d-flex gap-2'>
                                <button
                                  className='btn btn-sm btn-primary'
                                  onClick={() => iniciarEdicao(p)}
                                >
                                  <i className='bi bi-pencil'></i> Editar
                                </button>
                                <button
                                  className='btn btn-sm btn-danger'
                                  onClick={() => remover(p.id)}
                                >
                                  <i className='bi bi-trash'></i> Remover
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
