import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import CityInput from './CityInput';
import RouteButton from './RouteButton';

const API_KEY = '5b3ce3597851110001cf624819434cbc61c24a729b84ce63843d4c0e'; // Reemplaza con tu API Key

const RouteMap = () => {
  const mapRef = useRef(null);
  const [startCity, setStartCity] = useState("");
  const [endCity, setEndCity] = useState("");
  const [startCoords, setStartCoords] = useState(null);
  const [endCoords, setEndCoords] = useState(null);
  const [distance, setDistance] = useState(null);

  // Función para obtener coordenadas de una ciudad usando Nominatim
  const fetchCityCoordinates = async (city) => {
    try {
      const response = await axios.get("https://nominatim.openstreetmap.org/search", {
        params: { q: city, format: "json", limit: 1 },
      });

      if (response.data.length > 0) {
        return [parseFloat(response.data[0].lat), parseFloat(response.data[0].lon)];
      } else {
        alert("No se encontraron resultados para la ciudad.");
        return null;
      }
    } catch (error) {
      console.error("Error obteniendo coordenadas de la ciudad:", error);
      alert("Error al obtener las coordenadas.");
      return null;
    }
  };

  // Función para inicializar el mapa
  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map("map").setView([-38.4161, -63.6167], 5); // Centro de Argentina
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);
    }
  }, []);

  // Función para trazar la ruta y obtener la distancia
  const fetchAndDrawRoute = async () => {
    if (!startCoords || !endCoords) {
      alert("Por favor, ingresa ambas ciudades antes de buscar la ruta.");
      return;
    }

    try {
      const map = mapRef.current;

      // Limpiar marcadores y rutas previas
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker || layer instanceof L.Polyline) {
          map.removeLayer(layer);
        }
      });

      // Agregar marcadores de inicio y fin
      L.marker(startCoords).addTo(map).bindPopup("Ubicación de Inicio").openPopup();
      L.marker(endCoords).addTo(map).bindPopup(`Destino: ${endCity}`);

      // Llamar a la API de OpenRouteService
      const response = await axios.get("https://api.openrouteservice.org/v2/directions/driving-car", {
        params: {
          api_key: API_KEY,
          start: `${startCoords[1]},${startCoords[0]}`, // lon, lat
          end: `${endCoords[1]},${endCoords[0]}`, // lon, lat
        },
      });

      // Extraer coordenadas de la ruta
      const coordinates = response.data.features[0].geometry.coordinates;

      // Obtener distancia en km
      const routeDistance = response.data.features[0].properties.segments[0].distance;
      const distanceInKm = (routeDistance / 1000).toFixed(2);
      setDistance(distanceInKm);

      // Convertir coordenadas al formato Leaflet
      const leafletCoords = coordinates.map(([lon, lat]) => [lat, lon]);

      // Dibujar la ruta en el mapa
      const routeLine = L.polyline(leafletCoords, { color: "blue", weight: 4 }).addTo(map);

      // Ajustar la vista del mapa para mostrar toda la ruta
      map.fitBounds(routeLine.getBounds());

    } catch (error) {
      console.error("Error al obtener la ruta:", error);
      alert("No se pudo trazar la ruta.");
    }
  };

  // Función para manejar la búsqueda y trazado de la ruta
  const handleSearchRoute = async () => {
    if (!startCity || !endCity) {
      alert("Por favor, ingresa las ciudades de inicio y destino.");
      return;
    }

    // Obtener coordenadas de la ciudad de inicio y destino
    const startCoordinates = await fetchCityCoordinates(startCity);
    const endCoordinates = await fetchCityCoordinates(endCity);

    if (startCoordinates && endCoordinates) {
      setStartCoords(startCoordinates);
      setEndCoords(endCoordinates);
    }
  };

  // Ejecutar la función para trazar la ruta cuando se actualicen las coordenadas
  useEffect(() => {
    if (startCoords && endCoords) {
      fetchAndDrawRoute();
    }
  }, [startCoords, endCoords]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Imagen de fondo de Argentina */}
      <div className="absolute inset-0 z-0 bg-cover bg-center" id="map" style={{ height: "100vh" }}></div>

      {/* Panel de control superpuesto */}
      <div className="absolute left-0 top-0 p-6 z-40 pt-28">
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-6 ml-20">Mapa de Rutas</h1>

          <div className="flex flex-col space-y-4 w-full max-w-md">
            <CityInput 
              value={startCity}
              onChange={(e) => setStartCity(e.target.value)}
              placeholder="Elige punto de partida"
            />

            <CityInput 
              value={endCity}
              onChange={(e) => setEndCity(e.target.value)}
              placeholder="Elige un destino"
            />

            <RouteButton onClick={handleSearchRoute} />

            {distance && (
              <p className="text-lg font-semibold">
                Distancia entre {startCity} y {endCity}: {distance} km
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Mapa como fondo */}
      <div id="map" className="absolute inset-0 z-0" style={{ height: "100vh" }}></div>
    </div>
  );
};

export default RouteMap;
