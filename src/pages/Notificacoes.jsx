import { useEffect, useState } from "react";
import axios from "axios";
import RectanglePart from "../components/RectanglePart"; // Assumindo que este componente existe

function Notificacoes() {
  const [notificacoes, setNotificacoes] = useState([]);
  const [trens, setTrens] = useState([]);
  const [estacoes, setEstacoes] = useState([]);
  const [rotas, setRotas] = useState([]);
  const [form, setForm] = useState({
    titulo: "",
    mensagem: "",
    tipo: "trem",
    id_referencia: "",
    prioridade: "normal"
  });

  const [editId, setEditId] = useState(null);

  const API = "http://localhost:3333/api/notifications";
  const API_URL = "http://localhost:3333/api";

  // --- FUNÇÕES DE CARREGAMENTO DE DADOS DE REFERÊNCIA ---
  // Essas funções são mantidas, mas o useEffect principal é ajustado para orquestrar

  const carregarTrens = async () => {
    try {
      const res = await axios.get(`${API_URL}/trains`, { withCredentials: true });
      return res.data.trens || [];
    } catch (err) {
      console.error("Erro ao carregar trens:", err);
      return [];
    }
  };

  const carregarEstacoes = async () => {
    try {
      const res = await axios.get(`${API_URL}/stations`, { withCredentials: true });
      return res.data.estacoes || [];
    } catch (err) {
      console.error("Erro ao carregar estações:", err);
      return [];
    }
  };

  const carregarRotas = async () => {
    try {
      const res = await axios.get(`${API_URL}/routes`, { withCredentials: true });
      // Assumindo que a resposta de rotas pode ser um array direto ou um objeto com 'routes'
      return Array.isArray(res.data) ? res.data : res.data.routes || [];
    } catch (err) {
      console.error("Erro ao carregar rotas:", err);
      return [];
    }
  };

  // --- FUNÇÃO PARA OBTER LABEL DE REFERÊNCIA ---
  // Esta função agora recebe os arrays completos para mapeamento local
  const obterLabelReferencia = (tipo, id, todosTrens, todasEstacoes, todasRotas) => {
    switch (tipo) {
      case "trem":
        const trem = todosTrens.find(t => t.id_trem == id);
        return trem ? trem.modelo_trem : `Trem #${id}`;
      case "estacao":
        const estacao = todasEstacoes.find(e => e.id_estacao == id);
        return estacao ? estacao.nome_estacao : `Estação #${id}`;
      case "rota":
        // Assumindo que rotas tem saida_rota e destino_rota (como no seu código de GestaoDeRotas)
        const rota = todasRotas.find(r => r.id_rota == id);
        return rota ? `${rota.saida_rota} → ${rota.destino_rota}` : `Rota #${id}`;
      default:
        return `ID: ${id} (Tipo desconhecido)`;
    }
  };

  // --- CARREGAR NOTIFICAÇÕES E ANEXAR DADOS DE REFERÊNCIA ---
  const carregarNotificacoes = async (trensData, estacoesData, rotasData) => {
    try {
      const res = await axios.get(API, { withCredentials: true });
      const notificacoesRaw = Array.isArray(res.data) ? res.data : res.data.notificacoes || [];

      // Mapear as notificações e adicionar o rótulo de referência
      const notificacoesMapeadas = notificacoesRaw.map(notificacao => ({
        ...notificacao,
        // Adiciona um novo campo 'label_referencia'
        label_referencia: obterLabelReferencia(
          notificacao.tipo,
          notificacao.id_referencia,
          trensData,
          estacoesData,
          rotasData
        )
      }));

      setNotificacoes(notificacoesMapeadas);
    } catch (err) {
      console.error("Erro ao carregar notificações:", err);
      setNotificacoes([]);
    }
  };

  // --- useEffect PRINCIPAL PARA CARREGAR TODOS OS DADOS ---
  useEffect(() => {
    const carregarTodosOsDados = async () => {
      // 1. Carrega todos os dados de referência em paralelo
      const [trensData, estacoesData, rotasData] = await Promise.all([
        carregarTrens(),
        carregarEstacoes(),
        carregarRotas()
      ]);

      // 2. Salva os dados de referência nos estados locais
      setTrens(trensData);
      setEstacoes(estacoesData);
      setRotas(rotasData);

      // 3. Carrega as notificações, usando os dados de referência carregados
      carregarNotificacoes(trensData, estacoesData, rotasData);
    };

    carregarTodosOsDados();
  }, []);

  // --- FUNÇÕES DE SALVAR/EDITAR/EXCLUIR/CANCELAR (Sem alterações na lógica) ---
  const salvar = async () => {
    // ... lógica de salvar/atualizar ...
    try {
      if (!form.titulo || !form.mensagem || !form.id_referencia) {
        alert("Preencha todos os campos!");
        return;
      }

      if (editId) {
        await axios.put(`${API}/update/${editId}`, form, { withCredentials: true });
        alert("Notificação atualizada com sucesso!");
      } else {
        await axios.post(`${API}/create`, form, { withCredentials: true });
        alert("Notificação criada com sucesso!");
      }

      setForm({
        titulo: "",
        mensagem: "",
        tipo: "trem",
        id_referencia: "",
        prioridade: "normal"
      });

      setEditId(null);
      
      // Recarrega todos os dados para atualizar a lista com os labels corretos
      const [trensData, estacoesData, rotasData] = await Promise.all([
        carregarTrens(),
        carregarEstacoes(),
        carregarRotas()
      ]);
      setTrens(trensData);
      setEstacoes(estacoesData);
      setRotas(rotasData);
      carregarNotificacoes(trensData, estacoesData, rotasData);

    } catch (err) {
      console.error("Erro ao salvar notificação:", err);
      alert(err.response?.data?.message || "Erro ao salvar notificação.");
    }
  };

  const editar = (notificacao) => {
    setForm({
      titulo: notificacao.titulo,
      mensagem: notificacao.mensagem,
      tipo: notificacao.tipo,
      id_referencia: notificacao.id_referencia,
      prioridade: notificacao.prioridade || "normal"
    });
    setEditId(notificacao.id_notificacao);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelarEdicao = () => {
    setForm({
      titulo: "",
      mensagem: "",
      tipo: "trem",
      id_referencia: "",
      prioridade: "normal"
    });
    setEditId(null);
  };

  const excluir = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir esta notificação?")) {
      return;
    }

    try {
      await axios.delete(`${API}/delete/${id}`, { withCredentials: true });
      alert("Notificação excluída com sucesso!");
      
      // Recarrega apenas as notificações (os dados de ref. já estão no estado)
      carregarNotificacoes(trens, estacoes, rotas); 
    } catch (err) {
      console.error("Erro ao excluir notificação:", err);
      alert(err.response?.data?.message || "Erro ao excluir notificação.");
    }
  };
  
  // --- FUNÇÕES DE ESTILOS (Mantidas) ---
  const getPrioridadeBadge = (prioridade) => {
    const badges = {
      alta: "bg-danger",
      normal: "bg-primary",
      baixa: "bg-secondary"
    };
    return badges[prioridade] || "bg-secondary";
  };

  const getTipoIcon = (tipo) => {
    const icons = {
      trem: "🚂",
      estacao: "🏢",
      rota: "🛤️"
    };
    return icons[tipo] || "📢";
  };
  
  // --- RENDERIZAÇÃO (Ajustada para usar 'notificacao.label_referencia') ---
  return (
    <div className="container">
      <h2 className="mt-4 mb-4 fw-bold">Gerenciamento de Notificações</h2>

      {/* FORMULÁRIO (Mantido, mas agora os dropdowns usam os estados de trens, estacoes, rotas) */}
      <div className="mb-5 mt-4">
        <RectanglePart className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="mb-0 me-4">
              {editId ? "Editar Notificação" : "Criar Notificação"}
            </h4>
            
            <div className="d-flex gap-2 me-3">
              <button className="btn btn-primary" onClick={salvar}>
                {editId ? "Salvar Alterações" : "Criar Notificação"}
              </button>

              {editId && (
                <button className="btn btn-secondary" onClick={cancelarEdicao}>
                  Cancelar
                </button>
              )}
            </div>
          </div>

          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Título</label>
              <input
                className="form-control"
                placeholder="Ex: Manutenção programada"
                value={form.titulo}
                onChange={(e) => setForm({ ...form, titulo: e.target.value })}
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Tipo</label>
              <select
                className="form-select"
                value={form.tipo}
                onChange={(e) => setForm({ ...form, tipo: e.target.value, id_referencia: "" })}
              >
                <option value="trem">Trem</option>
                <option value="estacao">Estação</option>
                <option value="rota">Rota</option>
              </select>
            </div>

            <div className="col-md-3">
              <label className="form-label">Prioridade</label>
              <select
                className="form-select"
                value={form.prioridade}
                onChange={(e) => setForm({ ...form, prioridade: e.target.value })}
              >
                <option value="baixa">Baixa</option>
                <option value="normal">Normal</option>
                <option value="alta">Alta</option>
              </select>
            </div>

            <div className="col-md-12">
              <label className="form-label">Mensagem</label>
              <textarea
                className="form-control"
                rows="3"
                placeholder="Digite a mensagem da notificação..."
                value={form.mensagem}
                onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
              />
            </div>

            <div className="col-md-12">
              <label className="form-label">
                Vincular a {form.tipo === "trem" ? "Trem" : form.tipo === "estacao" ? "Estação" : "Rota"}
              </label>
              <select
                className="form-select"
                value={form.id_referencia}
                onChange={(e) => setForm({ ...form, id_referencia: e.target.value })}
              >
                <option value="">Selecione...</option>
                {form.tipo === "trem" && trens.map((trem) => (
                  <option key={trem.id_trem} value={trem.id_trem}>
                    {trem.modelo_trem}
                  </option>
                ))}
                {form.tipo === "estacao" && estacoes.map((estacao) => (
                  <option key={estacao.id_estacao} value={estacao.id_estacao}>
                    {estacao.nome_estacao}
                  </option>
                ))}
                {form.tipo === "rota" && rotas.map((rota) => (
                  <option key={rota.id_rota} value={rota.id_rota}>
                    {rota.saida_rota} → {rota.destino_rota}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </RectanglePart>
      </div>

      {/* LISTA DE NOTIFICAÇÕES */}
      <div className="mb-5 mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="mb-0 fw-bold">Notificações Cadastradas</h4>
          <span className="badge bg-primary fs-6">
            {notificacoes.length} {notificacoes.length === 1 ? 'notificação' : 'notificações'}
          </span>
        </div>

        {notificacoes.length === 0 ? (
          <div className="text-center py-5">
            <div className="mb-3" style={{fontSize: '3rem'}}>📢</div>
            <p className="text-muted fs-5">Nenhuma notificação cadastrada ainda.</p>
            <p className="text-muted">Crie sua primeira notificação usando o formulário acima!</p>
          </div>
        ) : (
          <div className="row g-3">
            {/* AGORA USAMOS 'notificacao.label_referencia' DIRETAMENTE, SEM CHAMAR A FUNÇÃO DE BUSCA */}
            {notificacoes.map((notificacao) => (
              <div key={notificacao.id_notificacao} className="col-md-6 mb-3">
                <RectanglePart className="p-4 h-100">
                  <div className="d-flex flex-column h-100">
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <h5 className="fw-bold mb-0" style={{color: '#2c3e50'}}>
                          {getTipoIcon(notificacao.tipo)} {notificacao.titulo}
                        </h5>
                        <span className={`badge ${getPrioridadeBadge(notificacao.prioridade)}`}>
                          {notificacao.prioridade}
                        </span>
                      </div>

                      <p className="mb-3 text-muted">{notificacao.mensagem}</p>

                      <div className="mb-2">
                        <span className="badge bg-secondary me-2">Tipo</span>
                        <span className="fs-6">{notificacao.tipo}</span>
                      </div>

                      <div className="mb-3">
                        <span className="badge bg-info me-2">Vinculado a</span>
                        <span className="fs-6">
                          {/* AQUI ESTÁ A MUDANÇA: USANDO O DADO JÁ INJETADO */}
                          {notificacao.label_referencia} 
                        </span>
                      </div>
                    </div>

                    <div className="d-flex gap-2 mt-3">
                      <button
                        className="btn btn-warning flex-fill"
                        onClick={() => editar(notificacao)}
                      >
                        ✏️ Editar
                      </button>

                      <button
                        className="btn btn-danger flex-fill"
                        onClick={() => excluir(notificacao.id_notificacao)}
                      >
                        🗑️ Deletar
                      </button>
                    </div>
                  </div>
                </RectanglePart>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Notificacoes;