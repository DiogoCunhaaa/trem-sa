import { useEffect, useState } from "react";
import axios from "axios";
import MapaInterativo from "../components/MapaInterativo";
import RectanglePart from "../components/RectanglePart";

function GestaoDeRotas() {
  const [rotas, setRotas] = useState([]);
  const [form, setForm] = useState({
    saida_rota: "",
    chegada_rota: "",
    destino_rota: "",
    id_trem: ""
  });

  const [editId, setEditId] = useState(null);

  const API = "http://localhost:3333/api/routes";

  // CARREGAR ROTAS
  const carregarRotas = async () => {
    try {
      const res = await axios.get(API, { withCredentials: true });

      console.log("ROTAS RECEBIDAS:", res.data);

      // Garante array mesmo se vier objeto
      setRotas(Array.isArray(res.data) ? res.data : res.data.routes || []);
    } catch (err) {
      console.error("Erro ao carregar rotas:", err);
      alert("Erro ao carregar rotas. Verifique se o backend está rodando.");
    }
  };

  useEffect(() => {
    carregarRotas();
  }, []);

  // SALVAR OU EDITAR
  const salvar = async () => {
    try {
      // Validação básica
      if (!form.saida_rota || !form.chegada_rota || !form.destino_rota || !form.id_trem) {
        alert("Preencha todos os campos!");
        return;
      }

      if (editId) {
        await axios.put(`${API}/update/${editId}`, form, {
          withCredentials: true,
        });
        alert("Rota atualizada com sucesso!");
      } else {
        await axios.post(`${API}/create`, form, {
          withCredentials: true,
        });
        alert("Rota criada com sucesso!");
      }

      setForm({
        saida_rota: "",
        chegada_rota: "",
        destino_rota: "",
        id_trem: "",
      });

      setEditId(null);
      carregarRotas();
    } catch (err) {
      console.error("Erro ao salvar rota:", err);
      alert(err.response?.data?.message || "Erro ao salvar rota.");
    }
  };

  // EDITAR
  const editar = (rota) => {
    setForm({
      saida_rota: rota.saida_rota,
      chegada_rota: rota.chegada_rota,
      destino_rota: rota.destino_rota,
      id_trem: rota.id_trem
    });
    setEditId(rota.id_rota);
    
    // Scroll suave até o formulário
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // CANCELAR EDIÇÃO
  const cancelarEdicao = () => {
    setForm({
      saida_rota: "",
      chegada_rota: "",
      destino_rota: "",
      id_trem: "",
    });
    setEditId(null);
  };

  // DELETAR
  const excluir = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir esta rota?")) {
      return;
    }

    try {
      await axios.delete(`${API}/delete/${id}`, { withCredentials: true });
      alert("Rota excluída com sucesso!");
      carregarRotas();
    } catch (err) {
      console.error("Erro ao excluir rota:", err);
      alert(err.response?.data?.message || "Erro ao excluir rota.");
    }
  };

  return (
    <div className="container">
      <h2 className="mt-4 mb-4 fw-bold">Gestão de Rotas</h2>

      {/* MAPA */}
      <div className="mb-5">
        <RectanglePart>
          <MapaInterativo rotas={rotas} />
        </RectanglePart>
      </div>

      {/* FORM */}
      <div className="mb-5 mt-4">
        <RectanglePart className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="mb-0 me-4">{editId ? "Editar Rota" : "Criar Rota"}</h4>
            
            <div className="d-flex gap-2 me-3">
              <button 
                className="btn btn-primary" 
                onClick={salvar}
              >
                {editId ? "Salvar Alterações" : "Criar Rota"}
              </button>

              {editId && (
                <button 
                  className="btn btn-secondary" 
                  onClick={cancelarEdicao}
                >
                  Cancelar
                </button>
              )}
            </div>
          </div>

          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Saída</label>
              <input
                className="form-control"
                placeholder="Ex: 08:00"
                value={form.saida_rota}
                onChange={(e) => setForm({ ...form, saida_rota: e.target.value })}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Chegada</label>
              <input
                className="form-control"
                placeholder="Ex: 16:00"
                value={form.chegada_rota}
                onChange={(e) => setForm({ ...form, chegada_rota: e.target.value })}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Destino</label>
              <input
                className="form-control"
                placeholder="Ex: São Paulo"
                value={form.destino_rota}
                onChange={(e) => setForm({ ...form, destino_rota: e.target.value })}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">ID do Trem</label>
              <input
                className="form-control"
                placeholder="Ex: 1"
                type="number"
                value={form.id_trem}
                onChange={(e) => setForm({ ...form, id_trem: e.target.value })}
              />
            </div>
          </div>
        </RectanglePart>
      </div>

      {/* LISTA */}
      <div className="mb-5 mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="mb-0 fw-bold">Rotas Cadastradas</h4>
          <span className="badge bg-primary fs-6">{rotas.length} {rotas.length === 1 ? 'rota' : 'rotas'}</span>
        </div>

        {rotas.length === 0 ? (
          <div className="text-center py-5">
            <div className="mb-3" style={{fontSize: '3rem'}}>🚂</div>
            <p className="text-muted fs-5">Nenhuma rota cadastrada ainda.</p>
            <p className="text-muted">Crie sua primeira rota usando o formulário acima!</p>
          </div>
        ) : (
          <div className="row g-3">
            {rotas.map((rota) => (
              <div key={rota.id_rota} className="col-md-6 mb-3">
                <RectanglePart className="p-4 h-100" style={{
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '';
                }}>
                  <div className="d-flex flex-column h-100">
                    <div className="flex-grow-1">
                      <h5 className="fw-bold mb-3" style={{color: '#2c3e50', fontSize: '1.3rem'}}>
                        🚂 {rota.saida_rota} ➜ {rota.destino_rota}
                      </h5>

                      <div className="mb-2">
                        <span className="badge bg-secondary me-2">Chegada</span>
                        <span className="fs-6">{rota.chegada_rota}</span>
                      </div>

                      <div className="mb-3">
                        <span className="badge bg-info me-2">Trem</span>
                        <span className="fs-6">{rota.nome_trem || `ID: ${rota.id_trem}`}</span>
                      </div>
                    </div>

                    <div className="d-flex gap-2 mt-3">
                      <button
                        className="btn btn-warning flex-fill btn-lg"
                        onClick={() => editar(rota)}
                      >
                        ✏️ Editar
                      </button>

                      <button
                        className="btn btn-danger flex-fill btn-lg"
                        onClick={() => excluir(rota.id_rota)}
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

export default GestaoDeRotas;