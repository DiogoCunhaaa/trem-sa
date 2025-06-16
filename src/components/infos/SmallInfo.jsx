function SmallInfo({ textColor, title, msg }) {
  return (
    <div className={`text-center w-100 ${textColor}`}>
      <h1 className='fs-5 fw-bold mb-3'>{title}</h1>
      <p>{msg}</p>
    </div>
  );
}

export default SmallInfo;
