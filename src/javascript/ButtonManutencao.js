const API_URL = 'http://localhost:3333';

export default class ButtonManutencao {
  static msg() {
    alert('Solicitação de reboque concluída com sucesso');
  }

  static getUserId() {
    try {
      const user = JSON.parse(sessionStorage.getItem('user'));
      return user?.id;
    } catch (_) {
      return null;
    }
  }

  static async fetchTrains() {
    const res = await fetch(`${API_URL}/api/trains/`, {
      method: 'GET',
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Falha ao carregar lista de trens');
    return res.json();
  }

  static findTrainId(trens, nomeTrem, numeroTrem) {
    if (!Array.isArray(trens)) return null;
    const byNumero = trens.find(
      (t) => String(t.numero_trem || t.modelo_trem || '').toLowerCase() === String(numeroTrem || '').toLowerCase()
    );
    const byNome = trens.find(
      (t) => String(t.nome_trem || '').toLowerCase() === String(nomeTrem || '').toLowerCase()
    );
    // Se ambos informados e encontrados, preferir aquele que casa com ambos
    const both = trens.find(
      (t) =>
        String(t.nome_trem || '').toLowerCase() === String(nomeTrem || '').toLowerCase() &&
        String(t.numero_trem || t.modelo_trem || '').toLowerCase() === String(numeroTrem || '').toLowerCase()
    );
    return (both || byNumero || byNome)?.id_trem || null;
  }

  static buildMensagem({ dataPedido, horarioPedido, tremNome, tremNumero }) {
    // Guardar estruturado para facilitar leitura/edição
    return JSON.stringify({
      data_pedido: dataPedido || null,
      horario_pedido: horarioPedido || null,
      trem_nome: tremNome || null,
      trem_numero: tremNumero || null,
    });
  }

  static parseMensagem(mensagem) {
    try {
      return JSON.parse(mensagem);
    } catch {
      return { data_pedido: null, trem_nome: null, trem_numero: null };
    }
  }

  static async add() {
    try {
      const userId = this.getUserId();
      if (!userId) {
        alert('Você precisa estar logado para adicionar pedidos.');
        return;
      }

      const nomePedido = prompt('Informe o nome do pedido:');
      if (!nomePedido) return;
      const tremNome = prompt('Informe o nome do trem (opcional):');
      const tremNumero = null;
      const dataPedido = prompt('Informe a data do pedido (YYYY-MM-DD) (opcional):');
      const horarioPedido = prompt('Informe o horário do pedido (HH:MM) (opcional):');

      let id_trem;
      if (tremNome && tremNome.trim()) {
        const trens = await this.fetchTrains();
        id_trem = this.findTrainId(trens, tremNome, tremNumero);
      }

      const payload = {
        mensagem_manutencao: this.buildMensagem({ dataPedido, horarioPedido, tremNome: tremNome || null, tremNumero }),
        nome_manutencao: nomePedido,
        tipo_manutencao: 'pedido',
        id_usuario: userId,
      };
      if (id_trem) payload.id_trem = id_trem;

      const res = await fetch(`${API_URL}/api/maintenance/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (res.ok) {
        alert(json.message || 'Pedido criado com sucesso');
      } else {
        alert(json.error || 'Falha ao criar pedido');
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao criar pedido.');
    }
  }

  static async read() {
    try {
      const res = await fetch(`${API_URL}/api/maintenance/`, {
        method: 'GET',
        credentials: 'include',
      });
      const lista = await res.json();
      if (!res.ok) {
        alert(lista.error || 'Falha ao buscar pedidos');
        return;
      }

      if (!Array.isArray(lista) || lista.length === 0) {
        alert('Nenhum pedido encontrado.');
        return;
      }

      const resumo = lista.map((item) => {
        const extra = this.parseMensagem(item.mensagem_manutencao);
        const tremNome = extra.trem_nome ?? item.nome_trem ?? '-';
        const tremNumero = extra.trem_numero ?? '-';
        const data = extra.data_pedido ?? '-';
        return `ID ${item.id_manutencao}: ${item.nome_manutencao} | Trem: ${tremNome} (${tremNumero}) | Data: ${data}`;
      });

      // Mostrar de forma simples; também logar completo
      console.table(lista);
      alert(resumo.join('\n'));
    } catch (err) {
      console.error(err);
      alert('Erro ao carregar pedidos.');
    }
  }

  static async edit() {
    try {
      const userId = this.getUserId();
      if (!userId) {
        alert('Você precisa estar logado para editar pedidos.');
        return;
      }

      const id = prompt('Informe o ID do pedido que deseja editar:');
      if (!id) return;

      // Buscar atual para facilitar as edições
      const atualRes = await fetch(`${API_URL}/api/maintenance/${id}`, {
        method: 'GET',
        credentials: 'include',
      });
      const atual = await atualRes.json();
      if (!atualRes.ok || !atual) {
        alert(atual.error || 'Pedido não encontrado');
        return;
      }
      const extraAtual = this.parseMensagem(atual.mensagem_manutencao);

      const novoNome = prompt('Novo nome do pedido:', atual.nome_manutencao || '');
      if (!novoNome) return;
      const novoTremNome = prompt('Novo nome do trem (opcional):', extraAtual.trem_nome || '');
      const novaData = prompt('Nova data do pedido (YYYY-MM-DD) (opcional):', extraAtual.data_pedido || '');
      const novoHorario = prompt('Novo horário do pedido (HH:MM) (opcional):', extraAtual.horario_pedido || '');

      let id_trem = atual.id_trem;
      if (novoTremNome && novoTremNome.trim()) {
        const trens = await this.fetchTrains();
        const novoId = this.findTrainId(trens, novoTremNome, null);
        if (novoId) id_trem = novoId;
      }

      const payload = {
        mensagem_manutencao: this.buildMensagem({
          dataPedido: (novaData && novaData.trim()) ? novaData : (extraAtual.data_pedido || null),
          horarioPedido: (novoHorario && novoHorario.trim()) ? novoHorario : (extraAtual.horario_pedido || null),
          tremNome: (novoTremNome && novoTremNome.trim()) ? novoTremNome : (extraAtual.trem_nome || null),
          tremNumero: null,
        }),
        nome_manutencao: novoNome,
        tipo_manutencao: 'pedido',
        id_usuario: userId,
      };
      if (id_trem) payload.id_trem = id_trem;

      const res = await fetch(`${API_URL}/api/maintenance/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (res.ok) {
        alert(json.message || 'Pedido atualizado com sucesso');
      } else {
        alert(json.error || 'Falha ao atualizar pedido');
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao editar pedido.');
    }
  }

  static async remove() {
    try {
      // Opcionalmente listar para ajudar a escolher
      const listaRes = await fetch(`${API_URL}/api/maintenance/`, {
        method: 'GET',
        credentials: 'include',
      });
      const lista = await listaRes.json();
      if (listaRes.ok && Array.isArray(lista) && lista.length > 0) {
        const linhas = lista.map((item) => `ID ${item.id_manutencao}: ${item.nome_manutencao}`).join('\n');
        alert(`Pedidos disponíveis:\n${linhas}`);
      }

      const id = prompt('Informe o ID do pedido que deseja remover:');
      if (!id) return;

      const res = await fetch(`${API_URL}/api/maintenance/delete/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const json = await res.json();
      if (res.ok) {
        alert(json.message || 'Pedido removido com sucesso');
      } else {
        alert(json.error || 'Falha ao remover pedido');
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao remover pedido.');
    }
  }
}