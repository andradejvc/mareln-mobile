// Tipos de dados de eventos
export type City = 'Caraguatatuba' | 'São Sebastião' | 'Ilhabela' | 'Ubatuba';

export type Category = 'Esporte' | 'Cultura' | 'Natureza' | 'Música' | 'Feira' | 'Gastronomia';

export type EventItem = {
  id: number;
  title: string;
  category: Category;
  date: string;
  time: string;
  place: string;
  city: City;
  image: string;
  free?: boolean;
  description: string;
  recommendations: string[];
};
