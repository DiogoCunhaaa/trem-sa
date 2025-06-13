import CustomButton from '../CustomButton';

function ButtonInfo({ title, buttonTitle, backgroundColor, textColor, onClick}) {
  return (
    <div className='mx-auto '>
      <h1 className='fs-5 fw-bold text-center' style={{ color: textColor }}>
        {title}
      </h1>
      <CustomButton whatFor={buttonTitle} backgroundColor='#b8b8b8' buttonTextColor={'black'} onClick={onClick} />
    </div>
  );
}

export default ButtonInfo;
