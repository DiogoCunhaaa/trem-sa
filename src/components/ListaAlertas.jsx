function ListaAlertas({ alertas, onEditar, onExcluir, onToggleAtivo }) {
  const getPrioridadeClass = (prioridade) => {
    const classes = {
      alta: 'danger',
      media: 'warning',
      baixa: 'info'
    };
    return classes[prioridade] || 'secondary';
  };

  const getSensorNome = (sensor) => {
    const sensores = {
      freio: 'Freio',
      combustivel: 'Combustível',
      temperatura: 'Temperatura',
      pressao: 'Pressão',
      velocidade: 'Velocidade',
      bateria: 'Bateria'
    };
    return sensores[sensor] || sensor;
  };

  const getCondicaoTexto = (condicao) => {
    const condicoes = {
      maior: '>',
      menor: '<',
      igual: '=',
      maior_igual: '≥',
      menor_igual: '≤'
    };
    return condicoes[condicao] || condicao;
  };

  if (alertas.length === 0) {
    return (
      <div className='text-center py-5'>
        <i className='bi bi-bell-slash' style={{ fontSize: '3rem', color: '#ccc' }}></i>
        <p className='mt-3 text-muted'>Nenhum alerta cadastrado</p>
      </div>
    );
  }

  return (
    <div className='table-responsive'>
      <table className='table table-hover'>
        <thead>
          <tr>
            <th style={{ width: '50px' }}>Status</th>
            <th>Nome</th>
            <th>Sensor</th>
            <th>Condição</th>
            <th>Prioridade</th>
            <th style={{ width: '150px' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {alertas.map((alerta) => (
            <tr key={alerta.id} style={{ opacity: alerta.ativo ? 1 : 0.6 }}>
              <td>
                <div className='form-check form-switch'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    checked={alerta.ativo}
                    onChange={() => onToggleAtivo(alerta.id)}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              </td>
              <td>
                <strong>{alerta.nome}</strong>
                <br />
                <small className='text-muted'>{alerta.descricao}</small>
              </td>
              <td>
                <span className='badge bg-secondary'>
                  {getSensorNome(alerta.sensor)}
                </span>
              </td>
              <td>
                <code>
                  {getSensorNome(alerta.sensor)} {getCondicaoTexto(alerta.condicao)} {alerta.valor}
                </code>
              </td>
              <td>
                <span className={`badge bg-${getPrioridadeClass(alerta.prioridade)}`}>
                  {alerta.prioridade.toUpperCase()}
                </span>
              </td>
              <td>
                <button
                  className='btn btn-sm btn-outline-primary me-2'
                  onClick={() => onEditar(alerta)}
                  title='Editar'
                >
                  <i className='bi bi-pencil'></i>
                </button>
                <button
                  className='btn btn-sm btn-outline-danger'
                  onClick={() => onExcluir(alerta)}
                  title='Excluir'
                >
                  <i className='bi bi-trash'></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaAlertas;