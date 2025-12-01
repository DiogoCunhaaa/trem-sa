import { useState, useEffect } from 'react';

function FormularioAlerta({ alerta, onSalvar, onCancelar }) {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    sensor: 'freio',
    condicao: 'maior',
    valor: '',
    prioridade: 'media',
    ativo: true
  });

  const [erros, setErros] = useState({});

  useEffect(() => {
    if (alerta) {
      setFormData(alerta);
    }
  }, [alerta]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    // Limpar erro do campo quando o usuário começar a digitar
    if (erros[name]) {
      setErros({ ...erros, [name]: '' });
    }
  };

  const validarFormulario = () => {
    const novosErros = {};

    if (!formData.nome.trim()) {
      novosErros.nome = 'Nome é obrigatório';
    }

    if (!formData.descricao.trim()) {
      novosErros.descricao = 'Descrição é obrigatória';
    }

    if (!formData.valor || formData.valor <= 0) {
      novosErros.valor = 'Valor deve ser maior que zero';
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validarFormulario()) {
      onSalvar({
        ...formData,
        valor: parseFloat(formData.valor)
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4 className='mb-4'>
        {alerta ? 'Editar Alerta' : 'Novo Alerta'}
      </h4>

      <div className='row'>
        <div className='col-md-6 mb-3'>
          <label className='form-label'>Nome do Alerta *</label>
          <input
            type='text'
            className={`form-control ${erros.nome ? 'is-invalid' : ''}`}
            name='nome'
            value={formData.nome}
            onChange={handleChange}
            placeholder='Ex: Freio desgastado'
          />
          {erros.nome && <div className='invalid-feedback'>{erros.nome}</div>}
        </div>

        <div className='col-md-6 mb-3'>
          <label className='form-label'>Prioridade *</label>
          <select
            className='form-select'
            name='prioridade'
            value={formData.prioridade}
            onChange={handleChange}
          >
            <option value='baixa'>Baixa</option>
            <option value='media'>Média</option>
            <option value='alta'>Alta</option>
          </select>
        </div>
      </div>

      <div className='mb-3'>
        <label className='form-label'>Descrição *</label>
        <textarea
          className={`form-control ${erros.descricao ? 'is-invalid' : ''}`}
          name='descricao'
          value={formData.descricao}
          onChange={handleChange}
          rows='2'
          placeholder='Descreva quando este alerta deve ser acionado'
        />
        {erros.descricao && <div className='invalid-feedback'>{erros.descricao}</div>}
      </div>

      <div className='row'>
        <div className='col-md-4 mb-3'>
          <label className='form-label'>Sensor *</label>
          <select
            className='form-select'
            name='sensor'
            value={formData.sensor}
            onChange={handleChange}
          >
            <option value='freio'>Freio</option>
            <option value='combustivel'>Combustível</option>
            <option value='temperatura'>Temperatura</option>
            <option value='pressao'>Pressão</option>
            <option value='velocidade'>Velocidade</option>
            <option value='bateria'>Bateria</option>
          </select>
        </div>

        <div className='col-md-4 mb-3'>
          <label className='form-label'>Condição *</label>
          <select
            className='form-select'
            name='condicao'
            value={formData.condicao}
            onChange={handleChange}
          >
            <option value='maior'>Maior que (&gt;)</option>
            <option value='menor'>Menor que (&lt;)</option>
            <option value='igual'>Igual a (=)</option>
            <option value='maior_igual'>Maior ou igual (≥)</option>
            <option value='menor_igual'>Menor ou igual (≤)</option>
          </select>
        </div>

        <div className='col-md-4 mb-3'>
          <label className='form-label'>Valor *</label>
          <input
            type='number'
            className={`form-control ${erros.valor ? 'is-invalid' : ''}`}
            name='valor'
            value={formData.valor}
            onChange={handleChange}
            step='0.01'
            placeholder='Ex: 70'
          />
          {erros.valor && <div className='invalid-feedback'>{erros.valor}</div>}
        </div>
      </div>

      <div className='mb-4'>
        <div className='form-check'>
          <input
            className='form-check-input'
            type='checkbox'
            name='ativo'
            checked={formData.ativo}
            onChange={handleChange}
            id='ativoCheck'
          />
          <label className='form-check-label' htmlFor='ativoCheck'>
            Alerta ativo
          </label>
        </div>
      </div>

      <div className='d-flex gap-2'>
        <button type='submit' className='btn btn-primary'>
          <i className='bi bi-check-circle me-2'></i>
          Salvar
        </button>
        <button type='button' className='btn btn-secondary' onClick={onCancelar}>
          <i className='bi bi-x-circle me-2'></i>
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default FormularioAlerta;