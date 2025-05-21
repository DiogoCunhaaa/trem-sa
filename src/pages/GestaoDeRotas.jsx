import HomeButton from '../components/HomeButton';
import WeatherCard from '../components/GestaoDeRotas/WeatherCard';


function GestaoDeRotas() {

  const handlePauseRoute = () => {
    console.log('Rota pausada');
    
  };

  const handleChangeRoute = () => {
    console.log('Mudar rota');
    
  };

  return (
    <>
      <WeatherCard />
    </>
  );
}

export default GestaoDeRotas;
