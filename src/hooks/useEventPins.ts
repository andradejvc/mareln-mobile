// Converte a lista de eventos em pins com coordenadas
import { useEffect, useMemo, useState } from 'react';
import type { EventItem } from '@/types/event';
import type { EventPin } from '@/components/map/types';
import {
  cacheKeyFor,
  cityFallback,
  geocodePlace,
  readGeocodeCache,
  writeGeocodeCache,
  type Coords,
} from '@/services/geocoding';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Coordenadas vindas da própria API, se existirem
const directCoords = (event: EventItem): Coords | null => {
  const { latitude, longitude } = event as EventItem & { latitude?: number; longitude?: number };
  return typeof latitude === 'number' && typeof longitude === 'number'
    ? { latitude, longitude }
    : null;
};

export function useEventPins(events: EventItem[]) {
  const [coords, setCoords] = useState<Record<number, Coords>>({});
  const [loading, setLoading] = useState(false);

  const signature = useMemo(
    () => events.map((e) => `${e.id}|${e.place}|${e.city}`).join(';'),
    [events]
  );

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      const cache = await readGeocodeCache();
      const next: Record<number, Coords> = {};
      const pending: EventItem[] = [];

      // Passo 1: mostra tudo que já é conhecido (API, cache ou fallback da cidade)
      for (const event of events) {
        const direct = directCoords(event);
        if (direct) {
          next[event.id] = direct;
          continue;
        }
        const key = cacheKeyFor(event.place, event.city);
        const cached = cache[key];
        if (cached) {
          next[event.id] = cached;
          continue;
        }
        const fallback = cityFallback(event.city, event.id);
        if (fallback) next[event.id] = fallback;
        if (!(key in cache)) pending.push(event);
      }
      if (cancelled) return;
      setCoords({ ...next });

      // Passo 2: refina um a um (Nominatim permite 1 requisição por segundo)
      for (const event of pending) {
        if (cancelled) return;
        const key = cacheKeyFor(event.place, event.city);
        try {
          const precise = await geocodePlace(event.place, event.city);
          cache[key] = precise;
          if (precise) {
            next[event.id] = precise;
            if (!cancelled) setCoords({ ...next });
          }
        } catch {
          // falha de rede: mantém o fallback e tenta de novo na próxima abertura
        }
        await sleep(1100);
      }

      await writeGeocodeCache(cache);
      if (!cancelled) setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature]);

  const pins = useMemo<EventPin[]>(
    () =>
      events
        .filter((event) => coords[event.id])
        .map((event) => ({
          id: event.id,
          title: event.title,
          place: event.place,
          city: event.city,
          date: event.date,
          time: event.time,
          latitude: coords[event.id].latitude,
          longitude: coords[event.id].longitude,
        })),
    [events, coords]
  );

  return { pins, loading };
}