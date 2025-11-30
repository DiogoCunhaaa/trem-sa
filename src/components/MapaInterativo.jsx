import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { useState } from "react";

export default function MapInteractivo() {
  const [markers, setMarkers] = useState([]);

  function AddMarkerOnClick() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setMarkers((prev) => [...prev, { lat, lng }]);
      }
    });
    return null;
  }

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <MapContainer
        center={[-26.3045, -48.8487]}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
      >
        <AddMarkerOnClick />

        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {markers.map((m, i) => (
          <Marker key={i} position={[m.lat, m.lng]}>
            <Popup>
              Marcador em: {m.lat.toFixed(5)}, {m.lng.toFixed(5)}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
