// Geocodificação de locais de eventos com cache e fallback por cidade
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Coords = { latitude: number; longitude: number };

const CACHE_KEY = '@event_geocode_cache_v1';

// Centro das cidades do litoral norte, usado como fallback
const CITY_CENTERS: Record<string, Coords> = {
  caraguatatuba: { latitude: -23.6203, longitude: -45.4131 },
  ubatuba: { latitude: -23.4336, longitude: -45.0838 },
  'sao sebastiao': { latitude: -23.76, longitude: -45.4097 },
  ilhabela: { latitude: -23.7781, longitude: -45.3581 },
};

const normalize = (value: string) =>
  value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase();

export const cacheKeyFor = (place: string, city: string) =>
  `${normalize(place)}|${normalize(city)}`;

// Centro da cidade com leve deslocamento determinístico (evita pins empilhados)
export function cityFallback(city: string, seed: number): Coords | null {
  const base = CITY_CENTERS[normalize(city)];
  if (!base) return null;
  const angle = (seed * 137.5 * Math.PI) / 180;
  const radius = 0.004 + (seed % 5) * 0.0015;
  return {
    latitude: base.latitude + Math.sin(angle) * radius,
    longitude: base.longitude + Math.cos(angle) * radius,
  };
}

export async function readGeocodeCache(): Promise<Record<string, Coords | null>> {
  try {
    const raw = await AsyncStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export async function writeGeocodeCache(cache: Record<string, Coords | null>) {
  try {
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    // cache é opcional
  }
}

// Busca no Nominatim. Retorna null se não achou; lança erro se a rede falhar
export async function geocodePlace(place: string, city: string): Promise<Coords | null> {
  const query = encodeURIComponent(`${place}, ${city}, SP, Brasil`);
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&countrycodes=br&q=${query}`,
    { headers: { 'Accept-Language': 'pt-BR' } }
  );
  if (!response.ok) throw new Error(`Geocoding falhou: ${response.status}`);

  const data = await response.json();
  if (!Array.isArray(data) || data.length === 0) return null;

  const coords = { latitude: parseFloat(data[0].lat), longitude: parseFloat(data[0].lon) };
  if (Number.isNaN(coords.latitude) || Number.isNaN(coords.longitude)) return null;

  // Descarta resultados muito longe da cidade (homônimos em outros estados)
  const center = CITY_CENTERS[normalize(city)];
  if (
    center &&
    (Math.abs(coords.latitude - center.latitude) > 0.6 ||
      Math.abs(coords.longitude - center.longitude) > 0.6)
  ) {
    return null;
  }
  return coords;
}