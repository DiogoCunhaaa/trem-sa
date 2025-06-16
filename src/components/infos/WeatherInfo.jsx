import { useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import RectanglePartInfo from '../RectanglePartInfo';
import CustomButton from '../CustomButton';
import MudarRotaModal from '../modals/MudarRotaModal';
import PausarRotaModal from '../modals/PausarRotaModal';

//TUDO ISSO PRA PEGAR A CIDADE DO USUARIO
function useCityLocation() {
  const [cidade, setCidade] = useState('');
  const [erroLocalizacao, setErroLocalizacao] = useState('');

  const OPENCAGE_API_KEY = process.env.REACT_APP_OPENCAGE_API_KEY;

  useEffect(() => {
    if (!OPENCAGE_API_KEY) {
      setErroLocalizacao('Chave da API de geolocalização não encontrada');
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (posicao) => {
          const { latitude, longitude } = posicao.coords;

          try {
            const resposta = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${OPENCAGE_API_KEY}&language=pt&pretty=1`
            );
            const dados = await resposta.json();

            const componentes = dados.results?.[0]?.components;

            const nomeCidade =
              componentes.city ||
              componentes.town ||
              componentes.village ||
              componentes.state ||
              componentes.country;
            setCidade(nomeCidade);
          } catch (erro) {
            setErroLocalizacao('Erro ao buscar a cidade.');
          }
        },
        () => {
          setErroLocalizacao('Permissao errada ou erro na geolocalizacao');
        }
      );
    } else {
      setErroLocalizacao('Geolocalizacao nao é suportada pelo seu navegador');
    }
  }, []);

  return { cidade, erroLocalizacao };
}

//É PRA PEGAR O CLIMA!!
function useCityWeather(cidade) {
  const [clima, setClima] = useState(null);
  const [erroClima, setErroClima] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
    if (!WEATHER_API_KEY) {
      setErroClima('Chave da API do clima não encontrada');
      return;
    }

    if (cidade) {
      const buscarClima = async () => {
        setIsLoading(true);

        try {
          const resposta = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${cidade}&lang=pt`
          );
          const dados = await resposta.json();

          if (resposta.ok) {
            setClima({
              temperatura: dados.current.temp_c,
              tempMax: dados?.forecast?.forecastday[0]?.day?.maxtemp_c,
              condicao: dados.current.condition.text,
              icone: dados.current.condition.icon,
              umidade: dados.current.humidity,
              vento: dados.current.wind_kph,
              visibilidade: dados.current.vis_km,
            });
          } else {
            setErroClima(null);
          }
        } catch (error) {
          setErroClima('Erro na conexao com a api');
        } finally {
          setIsLoading(false);
        }
      };

      buscarClima();
    }
  }, [cidade]);

  return { clima, erroClima, isLoading };
}

//RETORNAR O CARD
function WeatherInfo() {
  const { cidade, erroLocalizacao } = useCityLocation();
  const { clima, erroClima, isLoading } = useCityWeather(cidade);
  //MODAL MUDAR ROTA
  const [showModalMudar, setShowModalMudar] = useState(false);
  //MODAL PAUSAR ROTA
  const [showModalPausar, setShowModalPausar] = useState(false);

  const getWeatherIcon = (condicao) => {
    const lowerCondition = condicao.toLowerCase();

    if (lowerCondition.includes('sol'))
      return <i className='bi bi-brightness-high-fill'></i>;
    if (lowerCondition.includes('nublado'))
      return <i className='bi bi-cloudy-fill'></i>;
    if (lowerCondition.includes('chuva') || lowerCondition.includes('chuvisco'))
      return <i className='bi bi-cloud-drizzle-fill'></i>;
    if (lowerCondition.includes('tempestade'))
      return <i class='bi bi-cloudy-fill'></i>;
    if (
      lowerCondition.includes('névoa') ||
      lowerCondition.includes('nevoeiro') ||
      lowerCondition.includes('neblina') ||
      lowerCondition.includes('bruma')
    )
      return <i className='bi bi-cloud-fog2'></i>;
    if (lowerCondition.includes('vento')) return <i class='bi bi-wind'></i>;
    return '';
  };

  //SKELETON LOADING
  if (isLoading || !clima) {
    return (
      <div className='d-flex justify-content-between w-100 my-3 '>
        <SkeletonTheme baseColor='#b8b8b8' highlightColor='#ccc'>
          <div className='my-auto'>
            <p>
              <Skeleton height={20} />
            </p>
            <h1>
              <Skeleton height={30} width={100} />
            </h1>
            <p>
              <Skeleton height={20} />
            </p>
          </div>

          <div className='my-auto'>
            <Skeleton count={4} height={10} width={40} />
          </div>

          <div className='my-auto'>
            <Skeleton count={2} height={40} width={100} />
          </div>
        </SkeletonTheme>
      </div>
    );
  }

  //MUDAR ROTA

  return (
    <div className='d-flex justify-content-between w-100'>
      <div className='my-auto'>
        <RectanglePartInfo
          title={cidade || 'Carregando...'}
          titleFontSize={'fs-3'}
          temperatura={`${Math.round(clima.temperatura)} °C` || 'Carregando...'}
          tempFontSize={'fs-1'}
          description={
            <>
              {clima.condicao} {getWeatherIcon(clima.condicao)}
            </>
          }
          display={'none'}
        />
      </div>

      <div className='my-auto'>
        <div className='text-center'>
          <span className='d-block fw-lighter small'>Visibilidade</span>
          <span className='fw-bold small'>
            {`${clima.visibilidade} Km` || 'Carregando...'}
          </span>
        </div>
        <div className='text-center'>
          <span className='d-block fw-light small'>Umidade</span>
          <span className='fw-bold small'>{`${clima.umidade} %`}</span>
        </div>
        <div className='text-center'>
          <span className='d-block fw-light small'>Vento</span>
          <span className='fw-bold small'>
            {`${clima.vento} Km/h` || 'Carregando...'}
          </span>
        </div>
        <div className='text-center'>
          <span className='d-block fw-light small'>Máx</span>
          <span className='fw-bold small'>{`${Math.round(
            clima.tempMax
          )} °C`}</span>
        </div>
      </div>

      <div className='my-auto'>
        <CustomButton
          whatFor={'Pausar Rota'}
          onClick={() => setShowModalPausar(true)}
        />
        <CustomButton
          whatFor={'Mudar Rota'}
          onClick={() => setShowModalMudar(true)}
        />
      </div>

      <MudarRotaModal
        show={showModalMudar}
        onClose={() => setShowModalMudar(false)}
        onConfirm={(novaRota) => {
          console.log('Nova rota recebida');
          setShowModalMudar(false);
        }}
      />

      <PausarRotaModal
        show={showModalPausar}
        onClose={() => setShowModalPausar(false)}
        onConfirm={() => {
          console.log('A rota esta pausada');
          setShowModalPausar(false);
        }}
      />
    </div>
  );
}

export default WeatherInfo;
