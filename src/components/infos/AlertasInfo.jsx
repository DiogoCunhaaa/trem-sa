function AlertasInfo({ title, msg }) {
  return (
    <div>
      <div className='d-flex  align-items-center gap-2'>
        <h1 className='fs-2 fw-bold'>{title}</h1>
        <span>
          <i className='bi bi-exclamation-triangle'></i>
        </span>
      </div>

      <div>
        <span>{msg}</span>
      </div>
    </div>
  );
}
export default AlertasInfo;
