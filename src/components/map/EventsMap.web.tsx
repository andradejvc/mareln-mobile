
import React, { useEffect, useMemo, useRef } from 'react';
import { View } from 'react-native';
import type { EventPin, EventsMapProps } from './types';

const buildHtml = () => `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

<style>
* { box-sizing: border-box; }

html, body, #map {
  width: 100%;
  height: 100%;
  margin: 0;
}

body {
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.leaflet-container {
  background: #e8ece8;
}

.leaflet-control-attribution {
  font-size: 10px !important;
}

.leaflet-control-zoom {
  border: none !important;
  border-radius: 8px !important;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,.16) !important;
}

.leaflet-control-zoom a {
  color: #285c49 !important;
}

.event-icon {
  background: transparent;
  border: none;
}

.pin {
  position: relative;
  width: 34px;
  height: 34px;
  border: 3px solid #fff;
  border-radius: 50% 50% 50% 0;
  background: #16836b;
  transform: rotate(-45deg);
  box-shadow: 0 2px 5px rgba(0,0,0,.3);
  transition: transform .15s, background .15s;
}

.pin::after {
  content: "";
  position: absolute;
  width: 10px;
  height: 10px;
  top: 9px;
  left: 9px;
  border-radius: 50%;
  background: #fff;
}

.pin.selected {
  width: 40px;
  height: 40px;
  background: #e39a35;
  box-shadow: 0 0 0 4px rgba(227,154,53,.22), 0 3px 8px rgba(0,0,0,.3);
}

.pin.selected::after {
  width: 12px;
  height: 12px;
  top: 11px;
  left: 11px;
}

.leaflet-popup-content-wrapper {
  border-radius: 10px;
  box-shadow: 0 3px 16px rgba(0,0,0,.18);
}

.leaflet-popup-content {
  margin: 12px 15px;
  min-width: 150px;
}

.popup-title {
  display: block;
  color: #244638;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.4;
  margin-bottom: 4px;
}

.popup-place {
  color: #78877f;
  font-size: 11px;
}

.empty-state {
  position: absolute;
  z-index: 500;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 12px 16px;
  border-radius: 8px;
  background: white;
  color: #68796f;
  font-size: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,.12);
  white-space: nowrap;
}
</style>
</head>

<body>
<div id="map"></div>

<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

<script>
(() => {
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[c]));

  const map = L.map('map', {
    zoomControl: false,
    scrollWheelZoom: false
  });

  L.tileLayer(
    'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
    {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors, Tiles style by HOT'
    }
  ).addTo(map);

  L.control.zoom({ position: 'bottomright' }).addTo(map);

  const markerLayer = L.layerGroup().addTo(map);
  const markers = new Map();

  let pins = [];
  let selectedId = null;

  function createIcon(selected) {
    const size = selected ? 40 : 34;

    return L.divIcon({
      className: 'event-icon',
      html: '<div class="pin ' + (selected ? 'selected' : '') + '"></div>',
      iconSize: [size, size],
      iconAnchor: [0, size],
      popupAnchor: [size / 2, -size]
    });
  }

  function validPin(pin) {
    const lat = Number(pin.latitude);
    const lng = Number(pin.longitude);

    return Number.isFinite(lat) &&
      Number.isFinite(lng) &&
      Math.abs(lat) <= 90 &&
      Math.abs(lng) <= 180;
  }

  function selectMarker(id, move = true) {
    const pin = pins.find(item => String(item.id) === String(id));
    if (!pin) return;

    selectedId = pin.id;

    markers.forEach((marker, markerId) => {
      marker.setIcon(
        createIcon(String(markerId) === String(id))
      );
    });

    const marker = markers.get(pin.id);

    if (marker && move) {
      map.flyTo(marker.getLatLng(), Math.max(map.getZoom(), 14), {
        duration: .4
      });
      marker.openPopup();
    }
  }

  function renderPins(nextPins) {
    const previousSelection = selectedId;

    pins = nextPins.filter(validPin);
    markers.clear();
    markerLayer.clearLayers();

    pins.forEach(pin => {
      const marker = L.marker(
        [Number(pin.latitude), Number(pin.longitude)],
        {
          icon: createIcon(
            String(pin.id) === String(previousSelection)
          )
        }
      );

      marker.bindPopup(
        '<span class="popup-title">' + esc(pin.title) + '</span>' +
        '<span class="popup-place">' +
          esc(pin.place) + ', ' + esc(pin.city) +
        '</span>'
      );

      marker.on('click', () => {
        selectMarker(pin.id, false);

        parent.postMessage({
          type: 'pin-select',
          id: pin.id
        }, '*');
      });

      marker.addTo(markerLayer);
      markers.set(pin.id, marker);
    });

    selectedId = markers.has(previousSelection)
      ? previousSelection
      : null;

    const empty = document.querySelector('.empty-state');
    if (empty) empty.remove();

    if (!pins.length) {
      const message = document.createElement('div');
      message.className = 'empty-state';
      message.textContent = 'Nenhum evento com localização disponível';
      document.body.appendChild(message);
      map.setView([-23.62, -45.41], 10);
      return;
    }

    const bounds = L.latLngBounds(
      pins.map(pin => [
        Number(pin.latitude),
        Number(pin.longitude)
      ])
    );

    if (pins.length === 1) {
      map.setView(bounds.getCenter(), 14);
    } else {
      map.fitBounds(bounds, {
        padding: [45, 45],
        maxZoom: 14
      });
    }
  }

  window.addEventListener('message', event => {
    const data = event.data;

    if (!data || typeof data !== 'object') return;

    if (data.type === 'update-pins' && Array.isArray(data.pins)) {
      renderPins(data.pins);
    }

    if (data.type === 'select') {
      selectMarker(data.id);
    }

    if (data.type === 'clear-selection') {
      selectedId = null;

      markers.forEach(marker => {
        marker.setIcon(createIcon(false));
      });

      map.closePopup();
    }
  });

  map.setView([-23.62, -45.41], 10);

  window.addEventListener('resize', () => map.invalidateSize());
  setTimeout(() => map.invalidateSize(), 200);
})();
</script>
</body>
</html>`;

export default function EventsMap({
  pins,
  selectedId,
  onSelect,
}: EventsMapProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const pinsRef = useRef(pins);
  const selectedRef = useRef(selectedId);
  const onSelectRef = useRef(onSelect);

  const html = useMemo(() => buildHtml(), []);
  const pinsSignature = JSON.stringify(pins);

  pinsRef.current = pins;
  selectedRef.current = selectedId;
  onSelectRef.current = onSelect;

  useEffect(() => {
    iframeRef.current?.contentWindow?.postMessage({
      type: 'update-pins',
      pins: pinsRef.current,
    }, '*');
  }, [pinsSignature]);

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event.source !== iframeRef.current?.contentWindow) return;

      if (event.data?.type === 'pin-select') {
        onSelectRef.current(event.data.id);
      }
    };

    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  useEffect(() => {
    iframeRef.current?.contentWindow?.postMessage(
      selectedId == null
        ? { type: 'clear-selection' }
        : { type: 'select', id: selectedId },
      '*'
    );
  }, [selectedId]);

  return (
    <View style={{ flex: 1 }}>
      {React.createElement('iframe', {
        ref: iframeRef,
        srcDoc: html,
        title: 'Mapa de eventos',
        onLoad: () => {
          iframeRef.current?.contentWindow?.postMessage({
            type: 'update-pins',
            pins: pinsRef.current,
          }, '*');

          if (selectedRef.current != null) {
            iframeRef.current?.contentWindow?.postMessage({
              type: 'select',
              id: selectedRef.current,
            }, '*');
          }
        },
        style: {
          border: 0,
          width: '100%',
          height: '100%',
          display: 'block',
        },
      })}
    </View>
  );
}
