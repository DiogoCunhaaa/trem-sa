import { useEffect, useState } from "react";
import RectanglePart from "../RectanglePart";
import RectanglePartInfo from "../RectanglePartInfo";

function WeatherCard() {
  //TUDO ISSO PRA PEGAR A CIDADE DO USUARIO
  const [cidade, setCidade] = useState("");
  const [erro, setErro] = useState("");

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
            setErro("Erro ao buscar a cidade.");
          }
        },
        (erro) => {
          setErro("Permissao errada ou erro na geolocalizacao")
        }
      );
    } else {
      setErro("Geolocalizacao nao é suportada pelo seu navegador");
    }
  }, []);
  
  return (

    <div>
      <RectanglePart>
        <div className="p-4">
          <h1>cidade do usuaior</h1>
          {cidade && <p>vice esta em: {cidade}</p>}
          {erro && <p>{erro}</p>}
        </div>
      </RectanglePart>

      <RectanglePart>
        <RectanglePartInfo 
          title={cidade ? cidade : "Carregando..."}
        />
      </RectanglePart>













      <RectanglePart>
        
        <div className="row col-5">
          <div className="location fw-bold fs-4">
            Joinville <i className="bi bi-geo-alt"></i>
          </div>
          <div className="temperature fw-bold fs-1">
            25°C
          </div>
          <div className="weather fw-bold fs-6">
            Tempestade <i class="bi bi-cloud-lightning-rain"></i>
          </div>
        </div>
        <div className="row">
          <div className="visibilidade">
            <p className="m-0 fw-bold" style={{ fontSize: '11px'}}>Visibilidade</p>
            <p className="m-1" style={{ fontSize: '11px'}}>5km</p>
          </div>
          <div className="umidade">
            <p className="m-0 fw-bold" style={{ fontSize: '11px'}}>Umidade</p>
            <p className="m-1" style={{ fontSize: '11px'}}>88%</p>
          </div>
          <div className="vento">
            <p className="m-0 fw-bold" style={{ fontSize: '11px'}}>Vento</p>
            <p className="m-1" style={{ fontSize: '11px'}}>19km/h</p>
          </div>
          <div className="tempMax">
            <p className="m-0 fw-bold" style={{ fontSize: '11px'}}>Máx</p>
            <p className="m-1" style={{ fontSize: '11px'}}>31°C</p>
          </div>
        </div>
        <div className="buttonpause">

        </div>
        <div className="buttonchange">

        </div>
      </RectanglePart>
    </div>

  )
};

export default WeatherCard;