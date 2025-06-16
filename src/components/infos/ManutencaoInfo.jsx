function ManutencaoInfo({ title, msg, textColor, align = '' }) {
  return (
    <div className={`${align} m-2 `}>
      <div className={`mb-2 fw-2 fw-bold ${textColor}`}>
        <h5 className='fw-bold mb-1 text-center fs-5 '>{title}</h5>
        <p className='mb-2 text-center '>{msg}</p>
      </div>
    </div>
  );
}

export default ManutencaoInfo;
