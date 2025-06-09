import CustomButton from '../CustomButton';

function ButtonInfo({ title, buttonTitle, backgroundColor, textColor }) {
  return (
    <div className='mx-auto '>
      <h1 className='fs-5 fw-bold text-center' style={{ color: textColor }}>
        {title}
      </h1>
      <CustomButton whatFor={buttonTitle} backgroundColor='#b8b8b8' buttonTextColor={'black'} />
    </div>
  );
}

export default ButtonInfo;
