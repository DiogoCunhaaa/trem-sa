function ModalConfirmacao({ mostrar, titulo, mensagem, onConfirmar, onCancelar }) {
  if (!mostrar) return null;

  return (
    <>
      <div className='modal-backdrop fade show' onClick={onCancelar}></div>
      <div className='modal fade show d-block' tabIndex='-1'>
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>{titulo}</h5>
              <button 
                type='button' 
                className='btn-close' 
                onClick={onCancelar}
              ></button>
            </div>
            <div className='modal-body'>
              <p>{mensagem}</p>
            </div>
            <div className='modal-footer'>
              <button 
                type='button' 
                className='btn btn-secondary' 
                onClick={onCancelar}
              >
                Cancelar
              </button>
              <button 
                type='button' 
                className='btn btn-danger' 
                onClick={onConfirmar}
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalConfirmacao;