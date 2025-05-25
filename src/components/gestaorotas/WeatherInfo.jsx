import { useEffect, useState } from "react";
import RectanglePartInfo from "../RectanglePartInfo";


//TUDO ISSO PRA PEGAR A CIDADE DO USUARIO
function useCityLocation() {
  const [cidade, setCidade] = useState("");
  const [erroLocalizacao, setErroLocalizacao] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (posicao) => {
          const { latitude, longitude } = posicao.coords;

          try {
            const resposta = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const dados = await resposta.json();

            const nomeCidade = dados.address.city || dados.address.town || dados.address.village || dados.address.country;
            setCidade(nomeCidade);
          } catch (erro) {
            setErroLocalizacao("Erro ao buscar a cidade.");
          }
        },
        () => {
          setErroLocalizacao("Permissao errada ou erro na geolocalizacao")
        }
      );
    } else {
      setErroLocalizacao("Geolocalizacao nao é suportada pelo seu navegador");
    }
  }, []);

  return { cidade, erroLocalizacao };
}

//É PRA PEGAR O CLIMA!!
function useCityWeather(cidade) {
  const [clima, setClima] = useState(null);
  const [erroClima, setErroClima] = useState("");

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  useEffect(() => {
    if (cidade) {
      const buscarClima = async () => {
        try {
          const resposta = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cidade}&lang=pt`
          );
          const dados = await resposta.json();

          if (resposta.ok) {
            setClima({
              temperatura: dados.current.temp_c,
              condicao: dados.current.condition.text,
              icone: dados.current.condition.icon,
              umidade: dados.current.humidity,
              vento: dados.current.wind_kph,
            });
          } else {
            setErroClima("Erro ao buscar dados de clima");
          }
        } catch (error) {
          setErroClima("Erro na conexao com a api");
        }; 
      }

      buscarClima();
    }
  }, [cidade]);  

  return {clima, erroClima}
}


//RETORNAR O CARD
function WeatherInfo() {
  const {cidade, erroLocalizacao} = useCityLocation();
  const {clima, erroClima } = useCityWeather(cidade);

  const getWeatherIcon = (condicao) => {
    const lowerCondition = condicao.toLowerCase();

    if (lowerCondition.includes('sol')) return <i className="bi bi-brightness-high-fill"></i>;
    if (lowerCondition.includes('nublado')) return <i className="bi bi-cloudy-fill"></i>;
    if (lowerCondition.includes('chuva') || lowerCondition.includes("chuvisco")) return <i className="bi bi-cloud-drizzle-fill"></i>;
    if (lowerCondition.includes('tempestade')) return <i class="bi bi-cloudy-fill"></i>;
    if (lowerCondition.includes("névoa") || lowerCondition.includes("nevoeiro") || lowerCondition.includes("neblina") || lowerCondition.includes("bruma")) return <i className="bi bi-cloud-fog2"></i>;
    if (lowerCondition.includes("vento")) return <i class="bi bi-wind"></i>;
    return ''
  }

  if (!clima || !clima.condicao) {
    return <p>Carregando dados do clima...</p>
  }
  
  return (

    <div className="d-flex justify-content-between w-100">
        <RectanglePartInfo 
          title={cidade || "Carregando..."}
          titleFontSize={'fs-3'}
          temperatura={`${Math.round(clima.temperatura)} °C` || "Carregando..."}
          tempFontSize={'fs-1'}
          description={
            <>
              {clima.condicao} {getWeatherIcon(clima.condicao)}
            </>
          }
          display={'none'}
        />
        <RectanglePartInfo 
          description={'Visibilidade'}
          display={'none'}
        />

        <RectanglePartInfo 
          description={'Visibilidade'}
          display={'none'}
        />
    </div>

  )
};

export default WeatherInfo;