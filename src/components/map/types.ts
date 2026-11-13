// Tipo do pin exibido no mapa
export type EventPin = {
  id: number;
  title: string;
  place: string;
  city: string;
  date: string;
  time: string;
  latitude: number;
  longitude: number;
};

export type EventsMapProps = {
  pins: EventPin[];
  selectedId: number | null;
  onSelect: (id: number) => void;
};