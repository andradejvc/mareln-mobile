// Serviço de integração HTTP com o servidor web da API
import { Platform } from 'react-native';
import { images } from '@/data/images';
import type { Category, City, EventItem } from '@/types/event';

// URL base da API
const DEFAULT_HOST = Platform.select({
  android: 'http://10.0.2.2:3000',
  default: 'http://localhost:3000',
});

export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || DEFAULT_HOST;

// Modelo retornado pela API
export interface BackendEvento {
  id: number;
  titulo: string;
  descricao: string;
  data: string | Date;
  local: string;
  usuarioId?: number;
  categoriaId?: number | null;
  categoria?: {
    id: number;
    nome: string;
  } | null;
  usuario?: {
    id: number;
    nome: string;
    email: string;
  };
  imagem?: string;
  image?: string;
  cidade?: string;
  city?: string;
  gratuito?: boolean;
  free?: boolean;
  recomendacoes?: string[];
  recommendations?: string[];
}

export interface EventQueryFilters {
  titulo?: string;
  local?: string;
  data?: string;
  categoriaId?: number;
}

const VALID_CITIES: City[] = ['Caraguatatuba', 'São Sebastião', 'Ilhabela', 'Ubatuba'];
const VALID_CATEGORIES: Category[] = ['Música', 'Cultura', 'Esporte', 'Natureza', 'Feira', 'Gastronomia'];

const CATEGORY_IMAGES: Record<Category, string> = {
  Música: images.musical,
  Cultura: images.culture,
  Esporte: images.sports,
  Natureza: images.nature,
  Feira: images.fairs,
  Gastronomia: images.food,
};

// Formatação de data e hora
function formatDateTime(input: string | Date): { date: string; time: string } {
  try {
    const d = new Date(input);
    if (isNaN(d.getTime())) {
      return { date: 'A definir', time: '--:--' };
    }

    const months = ['jan.', 'fev.', 'mar.', 'abr.', 'mai.', 'jun.', 'jul.', 'ago.', 'set.', 'out.', 'nov.', 'dez.'];
    const day = String(d.getDate()).padStart(2, '0');
    const month = months[d.getMonth()];
    const date = `${day} de ${month}`;

    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const time = `${hours}:${minutes}`;

    return { date, time };
  } catch {
    return { date: 'A definir', time: '--:--' };
  }
}

// Identificação da cidade
function resolveCity(local: string, explicitCity?: string): City {
  if (explicitCity && VALID_CITIES.includes(explicitCity as City)) {
    return explicitCity as City;
  }

  const normalized = (local || '').toLowerCase();
  for (const city of VALID_CITIES) {
    if (normalized.includes(city.toLowerCase())) {
      return city;
    }
  }

  return 'Caraguatatuba';
}

// Identificação da categoria
function resolveCategory(catName?: string | null): Category {
  if (!catName) return 'Cultura';

  const normalized = catName.trim().toLowerCase();
  const match = VALID_CATEGORIES.find((c) => c.toLowerCase() === normalized);
  if (match) return match;

  if (normalized.includes('músic') || normalized.includes('show')) return 'Música';
  if (normalized.includes('esport') || normalized.includes('surf')) return 'Esporte';
  if (normalized.includes('natur') || normalized.includes('trilh')) return 'Natureza';
  if (normalized.includes('feir') || normalized.includes('artesanato')) return 'Feira';
  if (normalized.includes('gastro') || normalized.includes('comida')) return 'Gastronomia';

  return 'Cultura';
}

// Conversão do evento da API para o modelo do aplicativo
export function mapBackendEventoToEventItem(backend: BackendEvento): EventItem {
  const category = resolveCategory(backend.categoria?.nome);
  const city = resolveCity(backend.local, backend.cidade || backend.city);
  const { date, time } = formatDateTime(backend.data);

  const image =
    backend.imagem ||
    backend.image ||
    CATEGORY_IMAGES[category] ||
    images.culture;

  const defaultRecommendations = [
    'Confira a programação com a organização.',
    'Chegue com antecedência.',
    'Verifique as condições do local.',
  ];

  return {
    id: backend.id,
    title: backend.titulo,
    description: backend.descricao,
    category,
    city,
    place: backend.local,
    date,
    time,
    image,
    free: backend.gratuito ?? backend.free ?? true,
    recommendations: backend.recomendacoes || backend.recommendations || defaultRecommendations,
  };
}

// Requisição HTTP: listar eventos
export async function fetchEvents(filters?: EventQueryFilters): Promise<EventItem[]> {
  const queryParams = new URLSearchParams();
  if (filters?.titulo) queryParams.append('titulo', filters.titulo);
  if (filters?.local) queryParams.append('local', filters.local);
  if (filters?.data) queryParams.append('data', filters.data);
  if (filters?.categoriaId !== undefined) queryParams.append('categoriaId', String(filters.categoriaId));

  const query = queryParams.toString();
  const url = `${API_BASE_URL}/eventos${query ? `?${query}` : ''}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 7000);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Servidor retornou status ${response.status}`);
    }

    const data = (await response.json()) as BackendEvento[];
    return Array.isArray(data) ? data.map(mapBackendEventoToEventItem) : [];
  } finally {
    clearTimeout(timeoutId);
  }
}

// Requisição HTTP: buscar evento por ID
export async function fetchEventById(id: number): Promise<EventItem | null> {
  const url = `${API_BASE_URL}/eventos/${id}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 7000);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      signal: controller.signal,
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`Servidor retornou status ${response.status}`);
    }

    const data = (await response.json()) as BackendEvento;
    return mapBackendEventoToEventItem(data);
  } finally {
    clearTimeout(timeoutId);
  }
}
