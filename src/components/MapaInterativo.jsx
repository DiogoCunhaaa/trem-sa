import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
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

export default function MapaInterativo() {
  const [markers, setMarkers] = useState([]);

  return (
    <div style={{ height: "500px", width: "100%", position: "relative" }}>
      <MapContainer
        center={[-26.3045, -48.8487]} // Joinville, SC
        zoom={13}
        style={{ height: "100%", width: "100%", borderRadius: "8px" }}
        scrollWheelZoom={true}
      >
        <AddMarkerOnClick />
        
        <TileLayer 
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {markers.map((m, i) => (
          <Marker key={i} position={[m.lat, m.lng]}>
            <Popup>
              Ponto {i + 1}<br />
              {m.lat.toFixed(5)}, {m.lng.toFixed(5)}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
  
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