// Dados e eventos de demonstração (fallback)
import type { Category, City, EventItem } from '@/types/event';
import { images } from './images';

// Lista de cidades atendidas
export const cities: City[] = ['Caraguatatuba', 'São Sebastião', 'Ilhabela', 'Ubatuba'];

// Lista de categorias de eventos
export const categories: Category[] = ['Música', 'Cultura', 'Esporte', 'Natureza', 'Feira', 'Gastronomia'];

// Flag para ativar ou desativar dados estáticos de fallback
export const USE_STATIC_FALLBACK = true;

// Eventos estáticos de demonstração
export const STATIC_FALLBACK_EVENTS: EventItem[] = [
  {
    id: 1,
    title: 'Festival de Jazz na Praia',
    category: 'Música',
    date: '28 de ago.',
    time: '18:00',
    place: 'Praia Grande de Ubatuba',
    city: 'Ubatuba',
    image: images.musical,
    free: true,
    description:
      'Uma programação dedicada ao jazz em um cenário de praia, com apresentações musicais e clima descontraído no litoral.',
    recommendations: [
      'Confira a programação com a organização.',
      'Chegue com antecedência.',
      'Leve uma canga ou cadeira de praia.',
    ],
  },
  {
    id: 2,
    title: 'Feira de Artesanato Local',
    category: 'Feira',
    date: '28 de ago.',
    time: '09:00',
    place: 'Praça Cândido Mota',
    city: 'Caraguatatuba',
    image: images.fairs,
    free: true,
    description:
      'Feira voltada ao artesanato local, reunindo trabalhos manuais e produtos de pequenos expositores.',
    recommendations: [
      'Leve uma bolsa reutilizável.',
      'Confirme as formas de pagamento com os expositores.',
      'Reserve um tempo para conhecer os estandes.',
    ],
  },
  {
    id: 3,
    title: 'Noite de Forró Pé de Serra',
    category: 'Música',
    date: '29 de ago.',
    time: '20:00',
    place: 'Praça de Eventos do Galeão',
    city: 'Ilhabela',
    image: images.musical,
    free: true,
    description:
      'Encontro com temática de forró pé de serra para aproveitar música e dança em clima de celebração.',
    recommendations: [
      'Use roupas e calçados confortáveis.',
      'Consulte o horário com a organização.',
      'Planeje o transporte de ida e volta.',
    ],
  },
];

// Exportação da lista de eventos
export const events: EventItem[] = USE_STATIC_FALLBACK ? STATIC_FALLBACK_EVENTS : [];

// Busca de evento por identificador
export const getEventById = (id: number): EventItem | undefined =>
  events.find((event) => event.id === id);
