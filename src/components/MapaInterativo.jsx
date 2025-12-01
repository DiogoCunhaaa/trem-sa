import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents } from "react-leaflet";
import { useState, useEffect } from "react";
import L from 'leaflet';

// Corrigir ícones do Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function MapaInterativo({ rotas }) {
  const [markers, setMarkers] = useState([]);
  const [rotaPontos, setRotaPontos] = useState([]);

  // Carregar coordenadas da ROTA DO BANCO
  useEffect(() => {
    if (!rotas || rotas.length === 0) return;

    async function carregarCoordenadas() {
      const lista = [];

      for (let rota of rotas) {
        const pontos = [];

        const locais = [
          { nome: rota.saida_rota, tipo: "Saída" },
          { nome: rota.chegada_rota, tipo: "Chegada" },
          { nome: rota.destino_rota, tipo: "Destino" }
        ];

        for (let local of locais) {
          const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(local.nome)}&limit=1`;

          const response = await fetch(url, {
            headers: { "User-Agent": "RouteApp" }
          });

          const data = await response.json();

          if (data.length > 0) {
            pontos.push({
              tipo: local.tipo,
              nome: local.nome,
              lat: parseFloat(data[0].lat),
              lng: parseFloat(data[0].lon)
            });
          }
        }

        lista.push({
          id: rota.id_rota,
          nome_trem: rota.nome_trem,
          coords: pontos
        });
      }

      setRotaPontos(lista);
    }

    carregarCoordenadas();
  }, [rotas]);


  return (
    <div style={{ height: "500px", width: "100%", position: "relative" }}>
      <MapContainer
        center={[-26.3045, -48.8487]} // Joinville
        zoom={13}
        style={{ height: "100%", width: "100%", borderRadius: "8px" }}
        scrollWheelZoom={true}
      >
        <AddMarkerOnClick />

        <TileLayer 
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contrib.'
        />

        {/* PONTOS CRIADOS NO CLIQUE */}
        {markers.map((m, i) => (
          <Marker key={i} position={[m.lat, m.lng]}>
            <Popup>
              Ponto {i + 1}<br />
              {m.lat.toFixed(5)}, {m.lng.toFixed(5)}
            </Popup>
          </Marker>
        ))}

        {/* ROTAS VINDAS DO BACKEND */}
        {rotaPontos.map((rota) => {
          const positions = rota.coords.map((p) => [p.lat, p.lng]);

          return (
            <div key={rota.id}>
              {/* Marcadores */}
              {rota.coords.map((p, index) => (
                <Marker key={index} position={[p.lat, p.lng]}>
                  <Popup>
                    <strong>{p.tipo}</strong><br />
                    Local: {p.nome}<br />
                    Trem: {rota.nome_trem}
                  </Popup>
                </Marker>
              ))}

              {/* Linha conectando os pontos */}
              {positions.length >= 2 && (
                <Polyline positions={positions} />
              )}
            </div>
          );
        })}
      </MapContainer>
    </div>
  );

  // Mantém seu recurso original de adicionar marcadores manualmente
  function AddMarkerOnClick() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setMarkers((prev) => [...prev, { lat, lng }]);
      }
    });
    return null;
  }
}
