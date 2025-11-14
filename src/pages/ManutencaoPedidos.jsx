import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function getUserId(){
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

async function fetchJSON(url, opts={}){
  const res = await fetch(url, { ...opts, headers: { 'Content-Type': 'application/json', ...(opts.headers||{}) } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.json();
}

function parseMensagem(raw){
  try{
    return JSON.parse(raw);
  }catch{
    return {};
  }
}

export default function ManutencaoPedidos(){
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pedidos, setPedidos] = useState([]);
  const [trens, setTrens] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const userId = useMemo(() => getUserId(), []);

  async function carregar(){
    setLoading(true);
    setError('');
    try{
      const [dadosPedidos, dadosTrens] = await Promise.all([
        fetchJSON('/api/maintenance/'),
        fetchJSON('/api/trains')
      ]);
      setPedidos(dadosPedidos);
      setTrens(dadosTrens);
    }catch(e){
      setError('Erro ao carregar pedidos ou trens.');
    }finally{
      setLoading(false);
    }
  }

  useEffect(() => { carregar(); }, []);

  function tremPorId(id){
    return trens.find(t => t.id_trem === id) || null;
  }

  function dadosPedido(p){
    const msg = parseMensagem(p.mensagem_manutencao);
    const trem = tremPorId(p.id_trem);
    const tremNome = trem?.nome_trem || msg.trem_nome || '-';
    const tremNum = trem?.modelo_trem || msg.trem_numero || '-';
    return {
      id: p.id_manutencao,
      nome: p.nome_manutencao,
      data: msg.data || '-',
      tremNome,
      tremNum,
      tipo: p.tipo_manutencao,
      id_trem: p.id_trem,
    };
  }

  async function remover(id){
    try{
      await fetchJSON(`/api/maintenance/delete/${id}`, { method: 'DELETE' });
      setPedidos(prev => prev.filter(p => p.id_manutencao !== id));
    }catch(e){
      alert('Falha ao remover pedido.');
    }
  }

  function buildMensagem({ data, tremNome, tremNum }){
    return JSON.stringify({ data, trem_nome: tremNome, trem_numero: tremNum });
  }

  async function salvarEdicao(p){
    const body = {
      nome_manutencao: p.nome,
      mensagem_manutencao: buildMensagem({ data: p.data, tremNome: p.tremNome, tremNum: p.tremNum }),
      tipo_manutencao: p.tipo || 'pedido',
      id_trem: p.id_trem,
      id_usuario: userId,
    };
    try{
      await fetchJSON(`/api/maintenance/update/${p.id}`, { method: 'PUT', body: JSON.stringify(body) });
      setEditingId(null);
      await carregar();
    }catch(e){
      alert('Falha ao salvar edição.');
    }
  }

  if(!userId){
    return (
      <div className="container mt-4">
        <h3>Você precisa estar logado para ver os pedidos.</h3>
        <button className="btn btn-primary mt-2" onClick={() => navigate('/loginpage')}>Ir para Login</button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2>Pedidos de Manutenção</h2>
        <div>
          <button className="btn btn-secondary me-2" onClick={() => navigate('/manutencaocrud')}>Voltar</button>
          <button className="btn btn-outline-primary" onClick={carregar} disabled={loading}>Atualizar</button>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div>Carregando...</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Data</th>
                <th>Trem (Nome)</th>
                <th>Trem (Modelo/Numero)</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center">Nenhum pedido encontrado.</td>
                </tr>
              ) : (
                pedidos.map(pRaw => {
                  const p = dadosPedido(pRaw);
                  const isEditing = editingId === p.id;
                  return (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>
                        {isEditing ? (
                          <input className="form-control" defaultValue={p.nome} onChange={(e) => p.nome = e.target.value} />
                        ) : p.nome}
                      </td>
                      <td>
                        {isEditing ? (
                          <input className="form-control" type="date" defaultValue={p.data} onChange={(e) => p.data = e.target.value} />
                        ) : p.data}
                      </td>
                      <td>
                        {isEditing ? (
                          <input className="form-control" defaultValue={p.tremNome} onChange={(e) => p.tremNome = e.target.value} />
                        ) : p.tremNome}
                      </td>
                      <td>
                        {isEditing ? (
                          <input className="form-control" defaultValue={p.tremNum} onChange={(e) => p.tremNum = e.target.value} />
                        ) : p.tremNum}
                      </td>
                      <td>
                        {isEditing ? (
                          <>
                            <button className="btn btn-sm btn-success me-2" onClick={() => salvarEdicao(p)}>Salvar</button>
                            <button className="btn btn-sm btn-secondary" onClick={() => setEditingId(null)}>Cancelar</button>
                          </>
                        ) : (
                          <>
                            <button className="btn btn-sm btn-primary me-2" onClick={() => setEditingId(p.id)}>Editar</button>
                            <button className="btn btn-sm btn-danger" onClick={() => remover(p.id)}>Remover</button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}